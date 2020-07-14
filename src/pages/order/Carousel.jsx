import React, { Component } from 'react';
import { Carousel } from 'antd';
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.gif'
import img4 from '../../assets/images/4.jpg'
class CarouselCom extends Component {
    render() {
        return (
                <Carousel autoplay style={style.carousel}>
                    <div>
                        <img style={style.img} src={img1} alt="img1"></img>
                    </div>
                    <div>
                        <img style={style.img} src={img2} alt="img1"></img>

                    </div>
                    <div>
                        <img style={style.img} src={img3} alt="img1"></img>

                    </div>
                    <div>
                        <img style={style.img} src={img4} alt="img1"></img>

                    </div>
                </Carousel>
        );
    }
}
const style = {
    img: { height: '300px', margin: '0 auto' },
    carousel: { height:'100%',marginTop:"50px"}
}
export default CarouselCom;
