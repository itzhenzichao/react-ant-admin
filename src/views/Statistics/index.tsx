import Line from '@/components/Statistics/Line';
import Bar from '@/components/Statistics/Bar';
import Pie from '@/components/Statistics/Pie';

function Statistics() {
  return (
    <div>
      <div style={{height:'400px',display: 'flex'}}>
          <div style={{width:'50%'}}><Bar></Bar></div>
          <div style={{width:'50%'}}><Pie></Pie></div>
      </div>
      <div style={{ height: '400px',marginTop:'50px'}}>
        <Line></Line>
      </div>
    </div>
  );
}

export default Statistics;
