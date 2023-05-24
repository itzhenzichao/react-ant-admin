import { Table } from 'antd';
import { useState,useEffect } from 'react'
import { getGoodsList } from '@/request/api';
function Page2() {
  const [goodsData,setDataList] = useState({
    list:[],
    pageSize:1,
    total:0,
  })
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'goods_id',
    },
    {
      title: '商品名',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
  ];
  function getList (page=1) {
    getGoodsList({page}).then(res=>{
      console.log(res);
      if (res.data.code ===1 ) {
        const list = res.data.data
        setDataList({
          list:list,
          pageSize:10,
          total: 20,
          // total:res.data.total,
        })
      }
    })
  }

  useEffect(() => {
    return () => {
      getList();
    };
  }, []);
  return (
    <div>
        <Table rowKey='goods_id'
        pagination={{ position: ['bottomCenter'],
        defaultCurrent:1,total:goodsData.total,
        pageSize:goodsData.pageSize }}
        onChange={(pagination, filters, sorter, extra) => {
          getList(pagination.current)
          console.log('params', pagination, filters, sorter, extra);
        }}
        dataSource={goodsData.list} columns={columns} />;
    </div>
  );
}

export default Page2;
