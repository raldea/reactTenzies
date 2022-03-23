import DiceComponent from './Dice'

function Main() {
    return (
        <div className="main">
            <div className="header-title">
                <h1>Tenzies</h1>
                <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
            </div>
            <DiceComponent />
        </div>
    );
}

export default Main;