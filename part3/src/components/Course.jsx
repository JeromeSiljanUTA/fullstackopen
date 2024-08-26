import Content from "./Content";
import Header from "./Header";
import Statistics from "./Statistics";

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Statistics parts={course.parts} />
    </div>
  );
};

export default Course;
