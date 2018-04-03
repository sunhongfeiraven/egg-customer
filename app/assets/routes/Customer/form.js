import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Row, Col, Select, Divider, InputNumber } from 'antd';
import dic from '../../utils/dictionary';
import province from '../../utils/province.json';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.models.customer,
}))
@Form.create()
export default class BasicForms extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'customer/add',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const {
      getFieldDecorator,
      // getFieldValue,
    } = this.props.form;

    return (
      <PageHeaderLayout title="客户新增">
        <Card bordered={false}>
          <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <h3 style={{ marginBottom: 24 }}>基本信息</h3>
            <Divider />
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="客户名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输客户名称' }],
                  })(<Input placeholder="给目标起个名字" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="婚姻状况">
                  {getFieldDecorator('marital', {
                  })(
                    <Select placeholder="婚姻状况">
                      {Object.keys(dic.marital).map(item => (
                        <Option key={item} value={item}>
                          {dic.marital[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="年龄">
                  {getFieldDecorator('age', {
                  })(<InputNumber style={{ width: '100%' }} placeholder="年龄" />)}
                </FormItem>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="性别">
                  {getFieldDecorator('sex', {
                  })(
                    <Select placeholder="性别">
                      {Object.keys(dic.sex).map(item => (
                        <Option key={item} value={item}>
                          {dic.sex[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="学历">
                  {getFieldDecorator('education', {
                  })(
                    <Select placeholder="学历">
                      {Object.keys(dic.education).map(item => (
                        <Option key={item} value={item}>
                          {dic.education[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="籍贯">
                  {getFieldDecorator('placeOfOrigin', {
                  })(
                    <Select placeholder="籍贯">
                      {Object.keys(province).map(item => (
                        <Option key={item} value={item}>
                          {province[item].name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <h3 style={{ marginBottom: 24 }}>其他信息</h3>
            <Divider />
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="详细地址">
                  {getFieldDecorator('address', {})(<Input placeholder="详细地址" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="爱好">
                  {getFieldDecorator('hobby', {})(<Input placeholder="爱好" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="性格">
                  {getFieldDecorator('character', {})(<Input placeholder="性格" />)}
                </FormItem>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="社会背景">
                  {getFieldDecorator('social', {})(<Input placeholder="社会背景" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="经历">
                  {getFieldDecorator('experience', {})(<Input placeholder="经历" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="客户分类">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择客户分类' }],
                  })(
                    <Select placeholder="客户分类">
                      {Object.keys(dic.costomerType).map(item => (
                        <Option key={item} value={item}>
                          {dic.costomerType[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <FormItem label="备注">
                  {getFieldDecorator('remark', {})(
                    <TextArea rows={4} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <h3 style={{ marginBottom: 24 }}>分类信息</h3>
            <Divider />
            <FormItem style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
