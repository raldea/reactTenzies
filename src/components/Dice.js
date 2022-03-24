import React from "react"

function DiceComponent() {
    const [diceState, setDiceState] = React.useState([]);
    const [currentSelected, setCurrentSelected] = React.useState({set: false, value: 0});
    const [equalDice, setEqualDice] = React.useState(false);
    const diceCount = 10;
    const maxNumber = 6;
    const diceArray = [];
    let forCounter = 0;

    function randomizeAllDice() {
        for (forCounter; forCounter < diceCount; forCounter++) {
            const diceValue = Math.floor(Math.random() * maxNumber) + 1;
            const value = {id: forCounter, value: diceValue, freeze: false};
            diceArray.push(value);
        }

        setDiceState(diceArray);
    }

    React.useEffect(() => {
        randomizeAllDice();
    }, []);

    const diceWithElement = diceState.map((die, index) => {
        const dieClickable = currentSelected.set;

        if ((currentSelected.value === die.value) ||!dieClickable) {
            return (
                <div key={index} className={die.freeze ? 'active die' : 'die'}
                     onClick={() => {
                         freezeDie(index);
                     }}>{die.value}</div>
            );
        } else {
            return (
                <div key={index} className={die.freeze ? 'active die' : 'die'}>{die.value}</div>
            );
        }
    });

    function freezeDie(id) {
        const allEqual = diceState.every(die => die.value === diceState[0].value)

        if (allEqual) {
            setEqualDice(allEqual);
        }

        setDiceState((oldDiceState) => {
            return oldDiceState.map((die) => {
                if (id === die.id) {
                    setCurrentSelected((oldState) => {
                        if (!oldState.set) {
                            return ({...oldState, set: true, value: die.value});
                        } else {
                            return ({...oldState});
                        }
                    });

                    return ({
                        ...die,
                        freeze: true
                    });
                } else {
                    return ({...die})
                }
            })
        });
    }

    function rollDice() {
        setDiceState((oldDiceState) => {
            return oldDiceState.map((die) => {
                if (!die.freeze) {
                    return ({
                        ...die,
                        value: Math.floor(Math.random() * maxNumber) + 1
                    });
                } else {
                    return ({...die});
                }
            })
        });
    }

    function resetGame() {
        randomizeAllDice();
        setEqualDice(false);
        setCurrentSelected({set: false, value: 0});
    }

    return (
        <div className="dice-main-wrapper">
            <div className="dice-container">
                {diceWithElement}
            </div>
            <div className="button-container">
                {equalDice ? <button onClick={resetGame}>Reset Game</button> : <button onClick={rollDice}>Roll</button>}
            </div>
        </div>
    );
}

export default DiceComponent;