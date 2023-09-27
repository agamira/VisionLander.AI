function Image({ source, ...props }) {
  const { sources, img } = source;
  return (
    <picture style={{ height: "100%" }}>
      {Object.entries(sources).map(([type, srcMeta]) => {
        return (
          <source
            key={type}
            type={`image/${type}`}
            srcSet={srcMeta.map((m) => `${m.src} ${m.w}w`).join(", ")}
          />
        );
      })}
      <img src={img.src} {...props} />
    </picture>
  );
}

export { Image };
