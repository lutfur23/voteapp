  class App extends React.Component {

     constructor(props) {
      super(props);
      this.state = this.state = {
	 name:'',
         totalVotes:'0',
         totalHappyVote:'0',
         totalUnhappyVote:'0',
         totalAngryVote:'0',
         loading: false
       }
      }

      componentDidMount(){
       fetch('http://local.voteapidnf.com/api/votes/')
       .then((result) => {
           //If we want text, call result.text() or for json call result.json()
          var resultStr = result.json();
          return resultStr;
          }).then((jresult) => {
            //update the state
            this.setState({
               totalVotes:jresult.TotalVotes,
               totalHappyVote:jresult.TotalHappyVote,
               totalUnhappyVote:jresult.TotalUnhappyVotes,
               totalAngryVote:jresult.TotalAngryVote,
               loading: false
             });
          })
        }

        
        postApi(happyVote, unhappyVote, angryVote){
          let voterID = getCookie("voterid");
          let uservote = {
            VoterId: voterID,
	    Happy: happyVote,
            Unhappy: unhappyVote,
            Angry: angryVote
          }

          fetch('http://local.voteapidnf.com/api/votes/', {
	    method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(uservote)
            })
             .then(function(resp){
               // update current state
		this.setState({
                  totalVotes: resp.data.TotalVotes,
                  totalHappyVote: resp.data.TotalHappyVote,
                  totalUnhappyVote:resp.data.TotalUnhappyVote,
                  totalAngryVote:resp.data.TotalAngryVote,
                  loading: false
               });
           })
        }        


        render() {
           
            return (
                <div>
		    <h3>Total casted votes : {this.state.totalVotes}</h3>
                    <button onClick={() => this.postApi(1,0,0)}> <img height="22" width="22" src="./images/happy.png"/> <b>Happy</b></button>
                    <div>{this.state.totalHappyVote}</div>
		    <button onClick={() => this.postApi(0,1,0)}> <img height="22" width="22" src="./images/unhappy.png"/> <b>UnHappy</b> </button>
                    <div>{this.state.totalUnhappyVote}</div>
		    <button onClick={() => this.postApi(0,0,1)} ><img height="22" width="22" src="./images/angry.png"/> <b>Angry</b> </button>
                    <div>{this.state.totalAngryVote}</div>
                </div>
            );
        }
    }

    const domContainer = document.querySelector('#container');
    ReactDOM.render(<App />, domContainer );
