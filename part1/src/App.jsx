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

	    <h1>statistics</h1>
	    
	    <p>good {good}</p>
	    <p>neutral {neutral}</p>
	    <p>bad {bad}</p>
	    <p>all {good + neutral + bad}</p>
	    <p>positive {100 * good/(good + neutral + bad)}%</p>
	    
	</div>
    )
}

const Button = ({text, handler}) => {
    return (
	<button onClick={handler}>
	    {text}
	</button>
    )
}

export default App
