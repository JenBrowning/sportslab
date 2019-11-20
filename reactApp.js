function Team(props) {
    let shotPercentageDiv

    if(props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Shooting %: {shotPercentage}</strong>
            </div>
        )
    }

    return (
        <div>
            <div className="Team">
                <h2>{props.name}</h2>
            </div>

            <div className="identity">
                <img src={props.logo} alt={props.name} />
            </div>

            <div>
                <strong>Shots:</strong> {props.stats.shots}
            </div>

            <div>
                <strong>Score:</strong> {props.stats.score}
            </div>

            {shotPercentageDiv}

            <button onClick={props.shotHandler}>Shoot!</button>
        </div>
    
    )
}

function ScoreBoard(props) {
    return (
        <div className="ScoreBoard">
            <div className="teamstats">
                <h3>Visitors</h3>
                <h3>{props.visitingTeamStats.score}</h3>
            </div>

            <h3>SCOREBOARD</h3>

            <div className="teamStats">
                <h3>Home</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>
        </div>
    )
}

class Game extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           resetCount: 0,
           homeTeamStats: {
           shots: 0,
           score: 0
           },

           visitingTeamStats: {
               shots: 0,
               score: 0
           }
        }

        this.shotSound = newAudio('./assets/audio/smb.fireball.wav')
        this.scoreSound = newAudio('./assets/audio/smb_1-up.wav')

        shoot = (team) => {
            const teamStatsKey = `${team} TeamStats`
            let score = this.state[teamStatsKey].score
            this.shotSound.play()

            if(Math.random() > 0.5) {
                score += 1

                setTimeout(() => {
                    this.scoreSound.play()
                }, 100)
            }

            this.setState((state, props) => ({
                [teamStatsKey] : {
                    shots: state[teamStatsKey].shots + 1,
                    score
                }
            }))
        }

        resetGame = () => {
            this.setState((state, props) => ({
                resetCount: state.resetCount = 1,
                homeTeamStats: {
                    shots: 0,
                    score: 0
                },
                visitingTeamStats: {
                    shots: 0,
                    score: 0
                }
            }))
        }

        render () {
            return (
                <div className="Game">
                    <ScoreBoard
                        visitingTeamStats={this.state.visitingTeamStats}
                        homeTeamStats={this.state.homeTeamStats}
                    />
                    <h1>Welcome to {this.props.venue} </h1>
                    <div className="stats">
                        <Team 
                            name={this.props.visitingTeam.name}
                            logo={this.props.visitingTeam.logoSrc}
                            stats={this.state.visitingTeamStats}
                            shotHandler={() => this.shoot('visiting')}
                        />
        
                        <div className="versus">
                            <h1>VS</h1>
                            <strong>Reset:</strong> {this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
        
                        <Team 
                            name={this.props.homeTeam.name}
                            logo={this.props.homeTeam.logoSrc}
                            stats={this.state.homeTeamStats}
                            shotHandler={() => this.shoot('home')}
                        />
        
                    </div>
                </div>
            )
        }
   }
   
}

function App(props) {
    const raccoons = {
        name: 'Russiaville Racoons',
        logoSrc: './assets/images/raccoon.png'
    }

    const squirrels = {
        name: 'Sheridan Squirrels',
        logoSrc: './assets/images/squirrel.png'
    }

    const bunnies = {
        name: 'Burlington Bunnies',
        logoSrc: './assets/images/bunny.png'
    }

    const hounds = {
        name: 'Hammond Hounds',
        logoSrc: './assets/images/hound.png'
    }
    return (
      <div>
        <h1>Welcome to my Game.</h1>
        <Game 
            venue='Union 25 Gem' 
            homeTeam={squirrels}
            visitingTeam={raccoons}
        />      
        <Game 
            venue='Sheridan Arena'
            homeTeam={bunnies}
            visitingTeam={hounds} />
        </div>
    )
  }
  
  //Render the application
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
