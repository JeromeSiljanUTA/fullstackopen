const App = () => {
    const course = 'Half Stack application development'

    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
	name: 'Using props to pass data',
	exercises: 7
    }
    const part3 = {
	name: 'State of a component',
	exercises: 14
    }

    return (
	<div>
	    <Header course={course} />
	    <Content part1={part1} part2={part2} part3={part3} />
	</div>
    )
}

const Header = (props) => {
    return (
	<h1>{props.course}</h1>
    )
}

const Content = (props) => {
   return (
	<div>
	    <Part part_obj={props['part1']} />
	    <Part part_obj={props['part2']} />
	    <Part part_obj={props['part3']} />
	</div>
    )
}

const Part = (props) => {
    const part_obj = props['part_obj']
    return (
	<p>
	    {part_obj.name} {part_obj.exercises}
	</p>
    )
}

const Total = (props) => {
    return (
	<p>
	    Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
	</p>
    )
}


export default App
