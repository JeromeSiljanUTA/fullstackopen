const Statistics = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.map((part) => part.exercises).reduce((a, x) => a + x)}{" "}
        exercises
      </b>
    </p>
  );
};

export default Statistics;
