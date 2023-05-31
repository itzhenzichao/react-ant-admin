import { Table,Image,Form,Input,Button,Select,Modal,DatePicker,InputNumber,Radio} from 'antd';
const { Column } = Table;
import { useState,useEffect } from 'react'
import dayjs from 'dayjs';

interface formDefaultValueType {
  goods_id?:number,
  title?:string,
  price:number,
  type?:string,
  season:string,
  time?: number,
}
interface formType {
  goods_id?:number,
  title:string,
  price:number,
  type:string,
  season:string,
  time: number,
}
interface goodsDataType {
  list:formDefaultValueType[],
}
function Goods() {
  const [goodsData,setDataList] = useState<goodsDataType>({
    list:[],
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [modalTitle,setModalTitle] = useState('新增商品')
  const [formDefaultValue,setFormDefaultValue] = useState<formDefaultValueType>({ season: 'spring',price:1 })
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = !newLoadings[index];
      return newLoadings;
    });
  };
  function addGoodsList (goods:formDefaultValueType) {
    const list = [...goodsData.list,goods]
    setDataList({
      list
    }
    )
  }
  // 打开弹窗
  const openAddGoodsBox = ()=>{
    setIsModalOpen(true);
    setModalTitle('新增商品')
    // setFormDefaultValue({ season: 'autumn',price:99 })
    console.log('openAddGoodsBox',setFormDefaultValue)
  }
  // 页面初始化
  useEffect(() => {
    return () => {
      addGoodsList({
        goods_id:1,
        title:'这是一个商品',
        price:100,
        type:'overcoat',
        season:'summer',
        time: 1685436015361,
      });
    };
  }, []);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setFormDefaultValue({ season: 'spring',price:1 })
    console.log('handleClose',formDefaultValue,setFormDefaultValue)
  }
  // 保存
  const onFinish = (values: formType) => {
    enterLoading(0)
    const obj = {
      ...values
    }
    obj.time = values['time'].valueOf()
    setTimeout(() => {
      if (formDefaultValue.goods_id) {
        goodsData.list.forEach((item:any)=>{
          if (item.goods_id === formDefaultValue.goods_id) {
            Object.assign(item,obj)
          }
        })
      } else {
        obj.goods_id = new Date().getTime()
        addGoodsList(obj);
      }
      setIsModalOpen(false);
      enterLoading(0)
    },1000)
    console.log('Success:', values,formDefaultValue);
  };
  // 编辑
  const editGood = (text:string, record:any, index:number)=>{
    console.log(text, record, index)
    setIsModalOpen(true);
    setModalTitle('编辑商品')
    const newRecord = JSON.parse(JSON.stringify(record))
    newRecord.time = dayjs(Number(newRecord.time))
    setFormDefaultValue({ ...newRecord})
  }
  const config = {
    rules: [{ type: 'object' as const, required: true, message: '请选择入库时间!' }],
  };
  const optionsWithDisabled = [
    { label: '春季', value: 'spring' },
    { label: '夏季', value: 'summer' },
    { label: '秋季', value: 'autumn' },
    { label: '冬季', value: 'winter' },
  ];
  const typeOptions = [
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
  ]
  return (
    <div>
      <div>{contextHolder}</div>
        <Button type="primary" onClick={openAddGoodsBox}>新增</Button>
        {/* 商品弹窗 */}
        {
          <Modal destroyOnClose title={modalTitle} open={isModalOpen} afterClose={handleClose} onCancel={handleCancel} footer={null}>
            <Form
              preserve={false}
              form={form}
              name="basic"
              initialValues={formDefaultValue}
              onFinish={onFinish}
              // autoComplete="off"
              labelCol={{ span: 4 }}
            >
              <Form.Item
                label="商品名字"
                name="title"
                rules={[{ required: true, message: '请填写商品名字' }]}
              >
                <Input placeholder="请填写商品名字" />
              </Form.Item>
  
              <Form.Item
              label="商品类型"
              rules={[{ required: true, message: '请选择商品类型!' }]}
              name="type">
                <Select
                  showSearch
                  allowClear
                  placeholder="请选择商品类型"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={typeOptions}
                />
              </Form.Item>
              
              <Form.Item name="time" label="入库时间" {...config}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
  
              <Form.Item name="season" label="季节">
                <Radio.Group 
                    options={optionsWithDisabled}
                    optionType="button"
                    buttonStyle="solid"
                  />
              </Form.Item>
              <Form.Item name="price" label="价格" rules={[{ required: true, message: '请填写' }]}>
              <InputNumber min={0} />
              </Form.Item>
              <Form.Item style={{display: 'flex',justifyContent: 'center',margin:'0px'}}>
              <Button type="primary" htmlType="submit" loading={loadings[0]}>
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        }
        {/* 表格 */}
        <Table rowKey='goods_id'
        pagination={false}
        dataSource={goodsData.list} >
          <Column title="ID" dataIndex="goods_id" align="center" width={80} />
          <Column title="商品名" dataIndex="title"
            width={250}
            align="center"
            ellipsis={true} /> 
          <Column title="价格" dataIndex="price" align="center" />
          <Column title="类型" dataIndex="type" align="center" 
          render={(text) => (
            typeOptions.filter(item=>item.value === text)[0].label
          )}/>
          <Column title="季节" dataIndex="season" align="center" 
          render={(text) => (
            optionsWithDisabled.filter(item=>item.value === text)[0].label
          )}
          />
          <Column title="入库时间" dataIndex="time" align="center" width={200}
          render={(text) => (
            dayjs(Number(text)).format('YYYY-MM-DD HH:mm:ss')
          )} />
          <Column
              title="操作"
              dataIndex="operate"
              width={100}
              render={(text, record, index) => (
              <Button type="primary" onClick={()=>editGood(text, record, index)}>
                编辑
              </Button>
              )}
            />
        </Table>
    </div>
  );
}

export default Goods;
