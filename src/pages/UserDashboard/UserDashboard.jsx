import "./UserDashboard.scss";
import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Space,
  Button,
  Dropdown,
  message,
  Empty,
  Popconfirm,
} from "antd";
import { Logo, SiteCard, Button as MyButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../redux/authSlice";
import { api } from "../../api";
import { openModalByName } from "../../utils/modalUtils";

const { Header, Sider, Content } = Layout;

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [websites, setWebsites] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();
  const loggedUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  function handleLogOut() {
    dispatch(logoutAsync())
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        error(err.message);
        error("Something went wrong!");
      });
  }

  const confirm = (id) => {
    api
      .delete(`/delete/${id}`)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        api.post("/dashboard", { email: loggedUser.email }).then((res) => {
          setWebsites(res.data);
          message.success("Website deleted!");
        });
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong!");
      });
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const items = [
    {
      label: <a onClick={() => navigate("/")}>Home</a>,
      key: "0",
    },
    {
      label: <a onClick={() => handleLogOut()}>Log Out</a>,
      key: "1",
    },
  ];

  useEffect(() => {
    api.post("/dashboard", { email: loggedUser.email }).then((res) => {
      setWebsites(res.data);
    });
  }, [loggedUser.email]);

  function handleDomainChange(id) {
    // if (!loggedUser.premium) {
    //   message.warning("You need to upgrade to premium to change domain!");
    //   openModalByName(dispatch, "pricingModal");
    //   return;
    // }
    navigate(`/dashboard/?${id}`);
    openModalByName(dispatch, "buyDomainModal");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#070f23",
        }}
        trigger={null}
        collapsible
        collapsed={!collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          style={{ background: "#070f23" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="content-layout">
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 0,
            background: "#070f23",
          }}
        >
          <div className="logo-wrapper">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: "#fff",
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Logo />
          </div>
          <div className="user">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <a className="btn" onClick={(e) => e.preventDefault()}>
                <Space>
                  {loggedUser.email}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <p
            style={{
              color: "#fff",
              fontFamily: "Bai Jamjuree",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "150%",
              marginBottom: "24px",
            }}
          >
            Your sites:
          </p>
          <div className="site-card-list">
            {websites?.lenght ? (
              websites.map(({ id, title, template, domain }) => {
                return (
                  <SiteCard
                    key={id}
                    id={id}
                    title={title}
                    template={template}
                    domain={domain}
                    deleteAction={
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement="right"
                      >
                        <Button
                          type="primary"
                          danger
                          style={{ padding: "8px 12px", height: "100%" }}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    }
                    changeDomainAction={
                      <MyButton
                        style={{ borderRadius: "8px" }}
                        className="btn btn--outline"
                        onClick={() => handleDomainChange(id)}
                      >
                        {domain ? "Change domain" : "Add domain"}
                      </MyButton>
                    }
                  />
                );
              })
            ) : (
              <Empty className="empty" description={false} />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export { UserDashboard };
