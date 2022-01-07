import React from 'react';
import '../home.css';
import { useAppContext } from '../../appContext';
import { Player, ControlBar} from 'video-react';
import { Component, Button } from 'react';
import { PrismCode } from 'react-prism';

function GetCurrentVideo() {
    const { uploadedFiles } = useAppContext();
    return uploadedFiles;
}

export default class PlayerControlExample extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        source: GetCurrentVideo()
      };
  
      this.play = this.play.bind(this);
      this.pause = this.pause.bind(this);
      this.load = this.load.bind(this);
      this.changeCurrentTime = this.changeCurrentTime.bind(this);
      this.seek = this.seek.bind(this);
      this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
      this.changeVolume = this.changeVolume.bind(this);
      this.setMuted = this.setMuted.bind(this);
    }
  
    componentDidMount() {
      // subscribe state change
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }
  
    setMuted(muted) {
      return () => {
        this.player.muted = muted;
      };
    }
  
    handleStateChange(state) {
      // copy player state to this component's state
      this.setState({
        player: state
      });
    }
  
    play() {
      this.player.play();
    }
  
    pause() {
      this.player.pause();
    }
  
    load() {
      this.player.load();
    }
  
    changeCurrentTime(seconds) {
      return () => {
        const { player } = this.player.getState();
        this.player.seek(player.currentTime + seconds);
      };
    }
  
    seek(seconds) {
      return () => {
        this.player.seek(seconds);
      };
    }
  
    changePlaybackRateRate(steps) {
      return () => {
        const { player } = this.player.getState();
        this.player.playbackRate = player.playbackRate + steps;
      };
    }
  
    changeVolume(steps) {
      return () => {
        const { player } = this.player.getState();
        this.player.volume = player.volume + steps;
      };
    }
  
    render() {
      return (
        <div>
          <Player
            ref={player => {
              this.player = player;
            }}
            autoPlay
          >
            <source src={this.state.source} />
            <ControlBar autoHide={false} />
          </Player>
          <div className="py-3">
            <Button onClick={this.play} className="mr-3">
              play()
            </Button>
            <Button onClick={this.pause} className="mr-3">
              pause()
            </Button>
            <Button onClick={this.load} className="mr-3">
              load()
            </Button>
          </div>
          <div className="pb-3">
            <Button onClick={this.changeCurrentTime(10)} className="mr-3">
              currentTime += 10
            </Button>
            <Button onClick={this.changeCurrentTime(-10)} className="mr-3">
              currentTime -= 10
            </Button>
            <Button onClick={this.seek(50)} className="mr-3">
              currentTime = 50
            </Button>
          </div>
          <div className="pb-3">
            <Button onClick={this.changePlaybackRateRate(1)} className="mr-3">
              playbackRate++
            </Button>
            <Button onClick={this.changePlaybackRateRate(-1)} className="mr-3">
              playbackRate--
            </Button>
            <Button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">
              playbackRate+=0.1
            </Button>
            <Button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">
              playbackRate-=0.1
            </Button>
          </div>
          <div className="pb-3">
            <Button onClick={this.changeVolume(0.1)} className="mr-3">
              volume+=0.1
            </Button>
            <Button onClick={this.changeVolume(-0.1)} className="mr-3">
              volume-=0.1
            </Button>
            <Button onClick={this.setMuted(true)} className="mr-3">
              muted=true
            </Button>
            <Button onClick={this.setMuted(false)} className="mr-3">
              muted=false
            </Button>
          </div>
          <div>State</div>
          <pre>
            <PrismCode className="language-json">
              {JSON.stringify(this.state.player, null, 2)}
            </PrismCode>
          </pre>
        </div>
      );
    }
  }