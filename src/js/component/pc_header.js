/**
 * Created by Gracia on 17/9/12.
 */
import React from 'react';
import {Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        };
    }

    setModalVisible(value) {
        this.setState({modalVisible: value});
    }

    handleClick(e) {
        if (e.key='register') {
            this.setState({current:'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key});
        }
    }

    handleSubmit(e) {

    }

    render() {
        let {getFieldProps} = this.props.form;
        let userShow = this.state.hasLogined
            ? <Menu.Item>
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            <Link target="_blank">
                <Button type="dashed" htmlType="'button">
                    Profile
                </Button>
            </Link>
            <Button type="ghost" htmlType="button">Log out</Button>
        </Menu.Item>
            : <Menu.Item key="register" class="register">
            <Icon type="appstore"/>Register/Login
        </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}>

                    </Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/logo.svg" alt="logo"/>
                            <span>News</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/>World
                            </Menu.Item>
                            <Menu.Item key="politics">
                                <Icon type="appstore"/>Politics
                            </Menu.Item>
                            <Menu.Item key="tech">
                                <Icon type="appstore"/>Tech
                            </Menu.Item>
                            <Menu.Item key="travel">
                                <Icon type="appstore"/>Travel
                            </Menu.Item>
                            <Menu.Item key="sports">
                                <Icon type="appstore"/>Sports
                            </Menu.Item>
                            <Menu.Item key="entertain">
                                <Icon type="appstore"/>Entertainment
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                               onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)}
                               okText="Close" cancelText="Cancel">
                            <Tabs type="card">
                                <TabPane tab="Register" key="1">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="Account">
                                            <Input placeholder="Please enter your account" {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem label="Password">
                                            <Input type="password" placeholder="Please enter your password" {...getFieldProps('r_userPassword')}/>
                                        </FormItem>
                                        <FormItem label="Confirm Password">
                                            <Input type="password" placeholder="Please confirm your password" {...getFieldProps('r_confirmPassword')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">Register</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}>

                    </Col>
                </Row>
            </header>
        );
    }
}

export default PCHeader = Form.create({})(PCHeader);