import { useState } from 'react'

const App = () => {
    const anecdotes = [
	'If it hurts, do it more often.',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

    return (
	<div>
	    <Header text='Anecdote of the day' />
	    {anecdotes[selected]}
	    <br></br>
	    <Button len={anecdotes.length} setSelected={setSelected} points={points} setPoints={setPoints}/>
	    <Vote len={anecdotes.length} selected={selected} points={points} setPoints={setPoints}/>

	    <Header text='Anecdote with the most votes' />
	    <MaxVotes points={points} anecdotes={anecdotes} />

	</div>
    )
}
const MaxVotes = ({points, anecdotes}) => {
    const max_idx = (points.indexOf(Math.max(...points)))
    return (
	<div>
	    {anecdotes[max_idx]}
	    <br></br>
	    has {Math.max(...points)} votes
	</div>
    )
}

const Header = ({text}) => {
    return (
	<h1>{text}</h1>
    )
}

const Vote = ({len, selected, points, setPoints}) => {
    const onClick = () => {
	const tmp_points = [...points]
	tmp_points[selected] += 1
	setPoints(tmp_points)
	console.log(selected)
	console.log(tmp_points)
    }

    return (
	<button onClick={onClick}>vote</button>
    )
}

const Button = ({len, setSelected, points, setPoints}) => {
    const onClick = () => {
	const anectdote_idx = Math.floor(Math.random() * len)
	setSelected(anectdote_idx)
	console.log(anectdote_idx)
    }
    return (
	<button onClick={onClick}>next anecdote</button>
    )
}

export default App
