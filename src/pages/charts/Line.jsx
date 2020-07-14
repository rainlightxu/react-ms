import React, { Component } from 'react';
import { Line } from '@ant-design/charts';
class Page extends Component {
  render() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];
    const config = {
      data,
      title: {
        visible: true,
        text: '带数据点的折线图',
      },
      xField: 'year',
      yField: 'value',
    };
    return <Line {...config} />;
  }
}
export default Page;