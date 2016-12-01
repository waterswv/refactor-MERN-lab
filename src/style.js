const style = {
backgroundColor:'#FFC107',
  commentBox: {
    color:"#5E5C53",
    width:'80vw',
    margin:'0 auto',
    fontFamily:'Courier New, Courier, monospace'
  },
  title: {
    textAlign:'center',
    textTransform:'uppercase'
  },
  commentList: {
    borderRadius: '10px',
    backgroundColor: '#BDBDBD',
    border:'1px solid #f1f1f1',
    padding:'0 12px',
    maxHeight:'70vh',
    overflow:'scroll'
  },
  comment: {
    borderRadius: '10px',
    backgroundColor:'#B2DFDB',
    margin:'10px',
    padding:'3px 10px',
    fontSize:'.85rem'
  },
  commentForm: {
    margin:'10px',
    display:'flex',
    flexFlow:'row wrap',
    justifyContent:'space-between'
  },
  commentFormAuthor: {
    fontFamily:'Courier New, Courier, monospace',
    fontSize:'.85rem',
    minWidth:'150px',
    margin:'3px',
    padding:'0 10px',
    borderRadius:'3px',
    height:'40px',
    flex:'2'
  },
  commentFormText: {
    fontFamily:'Courier New, Courier, monospace',
    fontSize:'.85rem',
    color:'#5E5C53',
    flex:'4',
    minWidth:'400px',
    margin:'3px',
    padding:'0 10px',
    height:'40px',
    borderRadius:'3px'
  },
  commentFormPost: {
    minWidth:'75px',
    flex:'1',
    height:'40px',
    margin:'5px 3px',
    fontSize:'1rem',
    backgroundColor:'#FFC107',
    borderRadius:'3px',
    color:'white',
    letterSpacing:'.055rem',
    border:'none'
  },
  updateLink: {
    textDecoration:'none',
    fontSize:'.85rem',
    paddingRight:'15px',
    color:'#00796B'
  },
  deleteLink: {
    textDecoration:'none',
    fontSize:'.85rem',
    paddingRight:'15px',
    color:'#212121'
  }
}

module.exports = style;
