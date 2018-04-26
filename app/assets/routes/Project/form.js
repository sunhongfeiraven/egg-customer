import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Row, Col, Select, Divider } from 'antd';
import './style.less';
import dic from '../../utils/dictionary';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loading, project }) => ({
  detail: project.detail,
  submitting: loading.models.project,
}))
@Form.create()
export default class BasicForms extends React.Component {
  state = {
    projectId: undefined,
  };

  componentWillMount() {
    const { projectId } = this.props.match.params;
    this.setState({ projectId });
    if (projectId) {
      this.props.dispatch({ type: 'project/fetchDetail', payload: { projectId } });
    }
  }

  handleSubmit = (e) => {
    const { projectId } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      if (projectId) {
        this.props.dispatch({ type: 'project/update', payload: { ...values, projectId } });
      } else {
        this.props.dispatch({ type: 'project/add', payload: values });
      }
    });
  };

  render() {
    const { customerId } = this.state;
    const { submitting, detail } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <PageHeaderLayout title={customerId ? '项目修改' : '项目新增'}>
        <Card bordered={false}>
          <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <h3 style={{ marginBottom: 24 }}>基本信息</h3>
            <Divider />
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="项目名称">
                  {getFieldDecorator('name', {
                    initialValue: detail.name || undefined,
                    rules: [{ required: true, message: '请输客户名称' }],
                  })(<Input placeholder="给目标起个名字" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="规模">
                  {getFieldDecorator('scope', {
                    initialValue: detail.scope || undefined,
                  })(
                    <Select placeholder="规模">
                      {Object.keys(dic.scope).map(item => (
                        <Option key={item} value={item}>
                          {dic.scope[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="类型">
                  {getFieldDecorator('type', {
                    initialValue: detail.type || undefined,
                  })(
                    <Select placeholder="类型">
                      {Object.keys(dic.projectType).map(item => (
                        <Option key={item} value={item}>
                          {dic.projectType[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="项目来源">
                  {getFieldDecorator('source', {
                    initialValue: detail.source || undefined,
                  })(
                    <Select placeholder="项目来源">
                      {Object.keys(dic.source).map(item => (
                        <Option key={item} value={item}>
                          {dic.source[item]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem label="地址">
                  {getFieldDecorator('address', {
                    initialValue: detail.address || undefined,
                  })(<Input placeholder="地址" />)}
                </FormItem>
              </Col>
            </Row>
            <h3 style={{ marginBottom: 24 }}>接洽记录</h3>
            <Divider />
            <Row gutter={16}>
              {getFieldDecorator('record', {
                initialValue: detail.record || [],
              })(<TableForm />)}
            </Row>
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
