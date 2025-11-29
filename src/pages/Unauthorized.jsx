const Unauthorized = () => {
  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Unauthorized</h1>
      <p>You don&apos;t have permission to access this page.</p>
    </div>
  );
};

export default Unauthorized;
