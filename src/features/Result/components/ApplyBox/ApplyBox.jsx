const ApplyBox = ({ isLoading, data }) => {
  if (isLoading) {
    return <div>로당</div>;
  }

  if (data.length === 0) {
    return <>없을때</>;
  }
  return (
    <section>
      <p>추천 제품</p>
      {/* map */}
      {data.length !== 0 && (
        <div>
          {[...data]
            .sort((a, b) => a.order - b.order)
            .map((item, idx) => (
              <div key={idx}>
                <span>{item.order}</span>
                <p>{item.name}</p>
                <span>{item.reason}</span>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};
export default ApplyBox;
