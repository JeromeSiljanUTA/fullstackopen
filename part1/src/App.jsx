const App = () => {
    const course = {
	name: 'Half Stack application development',
	parts: [
	    {
		name: 'Fundamentals of React',
		exercises: 10
	    },
	    {
		name: 'Using props to pass data',
		exercises: 7
	    },
	    {
		name: 'State of a component',
		exercises: 14
	    }
	]
    }
    return (
	<div>
	    <Header course={course.name} />
	    <Content parts={course.parts} />
	    <Total parts={course.parts} />
	</div>
    )
}

const Header = ({course}) => {
    return (
	<h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    return (
	<div>
	    <Part part_obj={parts[0]} />
	    <Part part_obj={parts[1]} />
	    <Part part_obj={parts[2]} />
	</div>
    )
}

const Part = ({part_obj: {name, exercises}}) => {
    return (
	<p>
	    {name} {exercises}
	</p>
    )
}

const Total = ({parts}) => {
    const total_exercises = parts.map(part => part.exercises).reduce(
	(accumulator, element) => accumulator + element
    );
    return (
	<p>
	    Number of exercises {total_exercises}
	</p>
    )
}


export default App
