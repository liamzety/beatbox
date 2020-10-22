// OUTSOURCE IMPORTS
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CircleLoading } from 'react-loadingg';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
// LOCAL IMPORTS
import { Footer } from '../cmps/Footer';
import { loadBoxes } from '../store/actions/boxAction';
import { BoxApp } from './BoxApp';
import { BoxActive } from '../cmps/boxes/BoxActive';


class _Home extends Component {
    state = {
        imgsLoaded: false
    }

    countLoadedImgs = 0;

    onLoadImg = () => {
        this.countLoadedImgs++;
        if (this.countLoadedImgs === 3) {
            this.setState({ imgsLoaded: true });
        }
    }

    render() {
        const { imgsLoaded } = this.state;
        const { activeBoxes } = this.props;
        return (
            <React.Fragment>
                {(!imgsLoaded && <CircleLoading size="large" color="#ac0aff" />)}
                <div id="top" className={`hero-container flex justify-center align-center ${(imgsLoaded) ? '' : 'invisible'}`} >
                    <div className="hero-txt flex align-center justify-end column">
                        <div className="hero-title flex justify-end column">
                            <h1>Share the Beat</h1>
                            <p>Enjoy music. Enjoy company.</p>
                        </div>
                        <div className="hero-btns-container flex column space-around">
                            <a href="#active"><button>Start listening</button></a>
                            <a href="#active" className="scroll-down-arrow"><ExpandMoreSharpIcon ></ExpandMoreSharpIcon></a>
                        </div>
                    </div>
                    <div className="hero-img">
                        <img
                            onLoad={this.onLoadImg}
                            src={require('../assets/img/hero3-1920w.jpg')}
                            srcSet={`${require('../assets/img/hero3-1920w.jpg')} 800w,
                                    ${require('../assets/img/hero3-480w.jpg')} 480w`}
                            alt="heroimg1" />
                        <img
                            onLoad={this.onLoadImg}
                            src={require('../assets/img/hero2-1920w.jpg')}
                            srcSet={`${require('../assets/img/hero2-1920w.jpg')} 800w, 
                                    ${require('../assets/img/hero2-480w.jpg')} 480w`}
                            alt="heroimg2" />
                        <img
                            onLoad={this.onLoadImg}
                            src={require('../assets/img/hero1-1920w.jpg')}
                            srcSet={`${require('../assets/img/hero1-1920w.jpg')} 800w,
                                    ${require('../assets/img/hero1-480w.jpg')} 480w`}
                            alt="heroimg3" />
                    </div>
                </div>

                <BoxActive boxes={activeBoxes} />

                <div className="genre-list">
                    {imgsLoaded && <BoxApp />}
                </div>

                <Footer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        boxes: state.boxReducer.boxes,
        activeBoxes: state.boxReducer.activeBoxes
    }
}
const mapDispatchToProps = {
    loadBoxes,
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)