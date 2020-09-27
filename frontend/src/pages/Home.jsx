import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CircleLoading } from 'react-loadingg';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';

import { BoxApp } from './BoxApp'
import { loadBoxes } from '../store/actions/boxAction'
import { Footer } from '../cmps/Footer'
import { boxService } from '../services/boxService'
class _Home extends Component {

    componentDidMount() {
        this.props.loadBoxes();
    }

    render() {
        const { boxes } = this.props;
        if (!boxes) return <CircleLoading size="large" color="#ac0aff" />
        const genres = boxService.getUsedGenres(boxes);
        return (
            <React.Fragment>
                <div id="top" className="hero-container flex justify-center align-center" >
                    <div className="hero-txt flex align-center justify-end column">
                        <div className="hero-title flex justify-end column">
                            <h1>Share the Beat</h1>
                            <p>Enjoy the moment. Be happy.</p>
                        </div>
                        <div className="hero-btns-container flex column space-around">
                            <a href="#box"><button>Start listening</button></a>
                            <a href="#box" className="scroll-down-arrow"><ExpandMoreSharpIcon ></ExpandMoreSharpIcon></a>
                        </div>
                    </div>
                    <div className="hero-img">
                        <img src={require('../assets/img/hero3.jpg')} alt="" />
                        <img src={require('../assets/img/hero2.png')} alt="" />
                        <img src={require('../assets/img/hero1.jpg')} alt="" />
                    </div>
                </div>
                <div className="genre-list">
                    {genres.length && <BoxApp genres={genres} />}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        boxes: state.boxReducer.boxes,
    }
}
const mapDispatchToProps = {
    loadBoxes,
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)