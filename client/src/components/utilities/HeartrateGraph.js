import React, { Component, Fragment } from 'react';
import Chart from 'react-google-charts';
import moment from 'moment';

class HeartrateGraph extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const charData = [['Date', 'Heartrate']];

    const array = this.props.heartrateArray;
    array.reverse();

    for (let i = 0; i < array.length; i++) {
      charData.push([
        moment(array[i].date).format('DD-MM-YYYY, hh:mm A'),
        array[i].heartrate,
      ]);
    }

    const options = {
      explorer: {
        actions: ['dragToPan', 'rightClickToReset'],
      },
      width: '100%',
      height: 300,
      chartArea: { left: 60, top: 20, width: '100%', height: '90%' },
      hAxis: {
        textPosition: 'none',
      },
      pointSize: 5,
      backgroundColor: 'transparent',
      colors: ['#2196f3'],
    };

    console.log(charData);

    return (
      <Fragment>
        <div className='graph'>
          <Chart chartType='LineChart' data={charData} options={options} />
        </div>
      </Fragment>
    );
  }
}

export default HeartrateGraph;
