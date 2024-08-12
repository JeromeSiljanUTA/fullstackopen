import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
	<div>
	    <h1>give feedback</h1>
	    <Button text='good' handler={() => setGood(good + 1)}/>
	    <Button text='neutral' handler={() => setNeutral(neutral + 1)}/>
	    <Button text='bad' handler={() => setBad(bad + 1)}/>

	    <Statistics good={good} neutral={neutral} bad={bad} />
	</div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    return (
	<div>
	    <h1>statistics</h1>
	    <StatisticLine text='good' values={{'good': good, 'neutral': neutral, 'bad': bad}} stat='count'/>
	    <StatisticLine text='neutral' values={{'good': good, 'neutral': neutral, 'bad': bad}} stat='count'/>
	    <StatisticLine text='bad' values={{'good': good, 'neutral': neutral, 'bad': bad}} stat='count'/>
	    <StatisticLine text='all' values={{'good': good, 'neutral': neutral, 'bad': bad}} stat='all'/>
	    <StatisticLine text='pos' values={{'good': good, 'neutral': neutral, 'bad': bad}} stat='pos'/>
	</div>
    )
}

const StatisticLine = ({text, values, stat}) => {
    if (stat == 'count'){
	return (
	    <p>{text} {values[text]}</p>
	)
    }
    else if (stat == 'all'){
	return (
	    <p>{text} {Object.values(values).reduce((a, b) => a + b, 0)}</p>
	)
    }
    else if (stat == 'pos'){
	return (
	    <p>{text} {100 * values['good']/Object.values(values).reduce((a, b) => a + b, 0)}%</p>
	)
    }
}

const Button = ({text, handler}) => {
    return (
	<button onClick={handler}>
	    {text}
	</button>
    )
}

export default App
