/**
 * Created by Gracia on 17/9/24.
 */
import React from 'react';
import {Col, Row} from 'antd';
import {Link} from 'react-router-dom';

import Tloader from 'react-touch-loader';

export default class MobileList extends React.Component {

    constructor() {
        super();
        this.state = {
            news: '',
            count: 5,
            hasMore: 0,
            initializing: 1,
            refreshedAt: Date.now()
        };
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
            + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}));
    }

    loadMore(resolve) {
        setTimeout(() => {
            var count = this.state.count;
            this.setState({
                count: count + 5
            });

            var myFetchOptions = {
                method: 'GET'
            };

            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
                + this.props.type + "&count="
                + this.state.count, myFetchOptions)
                .then(response => response.json())
                .then(json => this.setState({news: json}));

            this.setState({
                hasMore: count > 0 && count < 50
            });

            resolve();

        }, 2e3);
    };

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                hasMore: 1,
                initializing: 2
            });
        }, 2e3);
    };

    render() {
        var {hasMore, initializing, refreshedAt} = this.state;

        const {news} = this.state;
        let newsList = news.length
            ? news.map((newsItem, index) => (
            <section key={index} class="mobileList">
                <Link to={`details/${newsItem.uniquekey}`}>
                    <div class="mobileListImg">
                        <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                    </div>
                    <div class="mobile_artical">
                        <div class="m_artical_title">
                            <span>{newsItem.title}</span>
                        </div>
                        <div class="m_article_desc">
                            <div class="m_article_desc_l">
                                <span class="m_article_channel">{newsItem.realtype}</span>
                                <span class="m_article_time">{newsItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        ))
            : 'No news loaded.';
        return (
            <div>
                <Col span={24}>
                    <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
                        {newsList}
                    </Tloader>
                </Col>
            </div>
        );
    }
}
