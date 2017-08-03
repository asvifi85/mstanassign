
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import classNames from 'classnames';
import styles from './style.css';


class TableRow extends React.Component {
   render() {
      return (
         <tr>
           
            <td style={{textAlign: 'center'}} className="accData">{this.props.data.account}</td>
            <td style={{textAlign: 'center'}}>${this.props.data.price}
													<br/>
												<small className={this.props.data.change_in_percent<0?'negetive':'positive'}>{this.props.data.change_in_percent}%/${this.props.data.changed_price}</small>
												</td>
         </tr>
      );
   }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccSort = this.handleAccSort.bind(this);
	this.handleCashSort = this.handleCashSort.bind(this);
	this.loadMore = this.loadMore.bind(this);
	this.asort = false;
	this.csort = false;
    this.state = {
					size: 2,
					records:[],
					showLoadMore: true,
					asortClass: 'descSort',
					csortClass: '',
					data : []
					};
  }
  componentDidMount() {
	   axios.get('/stockdata')
      .then(res => {
        const posts = res.data;
        this.setState({data : posts});
		this.setState({records :this.state.data.slice(0,this.state.size)});
      }); 
  }
  loadMore(){
	  //console.log(this.state.data);
		this.setState({records :this.state.data});
		this.setState({size:this.state.data.length});
		this.setState({showLoadMore:false});
	  
  }
  handleCashSort() {
	  
	  this.csort = !this.csort;
	let that = this;
   var sortedArr = this.state.records.sort(function(a, b) {
		  var nameAval = Number(a.price.replace(/,/g,'')); // ignore upper and lowercase
		  var nameBval = Number(b.price.replace(/,/g,'')); // ignore upper and lowercase
		  if (nameAval < nameBval) {
			return that.csort ? -1 : 1;
		  }
		  if (nameAval > nameBval) {
			return that.csort ? 1 : -1;
		  }

		  // names must be equal
		  return 0;
		  
});
	this.setState({asortClass:''});
	if(this.csort)
		this.setState({csortClass:'descSort'});
	else 
		this.setState({csortClass:'ascSort'});
	
	this.setState({records:sortedArr});
  }
  handleAccSort(e) {
   // this.setState({name: e.target.value});

	this.asort = !this.asort;
	this.setState({csortClass:''});
	let that = this;
   var sortedArr = this.state.records.sort(function(a, b) {
		  var nameAval = a.account.split('-')[1]; // ignore upper and lowercase
		  var nameBval = b.account.split('-')[1]; // ignore upper and lowercase
		  
		  if (nameAval < nameBval) {
			return that.asort ? -1 : 1;
		  }
		  if (nameAval > nameBval) {
			return that.asort ? 1 : -1;
		  }

		  // names must be equal
		  return 0;
		  
});
	
		
	 if(this.asort)
		this.setState({asortClass:'descSort'});
	else 
		this.setState({asortClass:'ascSort'});
	this.setState({records:sortedArr});
  }
  render() {
	
    return (
      <div style={{textAlign: 'center'}}>
     	
			<table width="100%" align="center">		
				<tr>
					<th onClick = {this.handleAccSort} className={this.state.asortClass !=''? 'active' : ''}>Account <span className={this.state.asortClass}></span></th><th className={classNames(this.state.csortClass !=''? 'active' : '','priceSection')} onClick = {this.handleCashSort}><span className={this.state.csortClass}></span><small>Available Cash</small> <br/><sub className='subtitle'>Today's Change</sub></th>
				</tr>
               <tbody>
                  {this.state.records.map((acc, i) => <TableRow key = {i} data = {acc} />)}
               </tbody>
            </table>
			<div onClick = {this.loadMore} style={this.state.showLoadMore ? {} : { 'display': 'none' }} className='loadMore'>Load more</div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));