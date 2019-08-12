import React, { Component } from 'react'
import { Upload, Icon, Button } from 'antd';
import styles from './index.less'

export default class FormImageUpload extends Component {

    onChange = (data) => {
        const {onChange} = this.props
        onChange(data.fileList)
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    render() {
        const { value } = this.props
        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">点击上传</div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={this.beforeUpload}
                onChange={this.onChange}
                className={styles.main}
                fileList={value || []}
            >
                {uploadButton}
            </Upload>
        )
    }
}
