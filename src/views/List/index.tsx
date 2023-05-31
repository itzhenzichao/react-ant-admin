import { Table,Image,Form,Input,Button,Select } from 'antd';
const { Column } = Table;
import { useState,useEffect } from 'react'
import { getGoodsList } from '@/request/api';
import Style from './index.module.scss'
function GoodsList() {
  const [goodsData,setDataList] = useState({
    list:[],
    pageSize:1,
    total:0,
  })
  let searchParams = {
    title:'',
    type:'',
  }
  function getList (page=1) {
    const params = {
      page,
      pageSize:goodsData.pageSize,
      ...searchParams
    }
    getGoodsList(params).then(res=>{
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

  // 搜索
  const onFinish = (values: any) => {
    searchParams =values
    getList();
  };
  
  return (
    <div>
        {/* 搜索 */}
        <div className={Style.search}>
          <Form
            name="basic"
            layout="inline"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="商品名"
              name="title"
            >
              <Input placeholder="选择输入商品名字" allowClear />
            </Form.Item>
            <Form.Item
            label="商品类型"
            name="type">
            <Select
            style={{ width: '178px' }}
              showSearch
              allowClear
              placeholder="选择商品类型"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'shirt',
                  label: '衬衣',
                },
                {
                  value: 'overcoat',
                  label: '外套',
                },
                {
                  value: 'pants',
                  label: '裤子',
                },
                {
                  value: 'shoes',
                  label: '鞋',
                },
              ]}
            />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* 表格 */}
        <Table rowKey='goods_id'
        pagination={{ position: ['bottomCenter'],
        defaultCurrent:1,total:goodsData.total,
        pageSize:goodsData.pageSize }}
        onChange={(pagination, filters, sorter, extra) => {
          getList(pagination.current)
        }}
        dataSource={goodsData.list} >
          <Column title="ID" dataIndex="goods_id" align="center"  />
          <Column title="商品名" dataIndex="title"
            width={300}
            align="center"
            ellipsis={true} />
          <Column
            title="商品图片"
            dataIndex="imgUrl"
            align="center"
            render={(imgUrl: string) => (
              <>
                <Image
                  width={100}
                  src={imgUrl}
                />
              </>
            )}
          />
          <Column title="价格" dataIndex="price" align="center" />
          <Column title="销量" dataIndex="buySum" align="center" />
        </Table>;
    </div>
  );
}

export default GoodsList;
