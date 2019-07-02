import React,{createRef} from "react"
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import {breakpoints,headerHeight} from '../utilities/styled';
import CSSTransition from '../utilities/CSSTransition';
import image200 from '../../assets/icons/200.svg';
import {graphql} from 'gatsby';

const Header = styled.div({
    position:"absolute",
    top:0,
    left:0,
    width:"100%",
    height: headerHeight,
    display: "-webkit-box",
    display: "-webkit-flex",
    display: "-ms-flexbox",
    display: "flex",
    WebkitAlignItems: "center",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center",
    justifyContent : "center",
    zIndex: 10,
    [breakpoints.sm]: {
    	paddingTop: 35
  	}
})


const MobileHeader = styled.div({  
  [breakpoints.md]: {
    display: 'none'
  }
})

const Nav = styled.div({
  display: 'flex',
  alignSelf: 'stretch',
  marginLeft: 'auto'
})

const MainWrapper = styled.main({
  flexGrow: 1,
  outline: 'none',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch'
});

const HeaderContent = styled.div({
    display: "flex",
    /*WebkitAlignItems: "center",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center",*/
})

const Banner = styled.div({

});

function NavLink({children,nav,path,active}){
  return <a key={path} href={path} className={active ? "nav-link active" : "nav-link"}>
            {nav}
          </a>
}

class Layout extends React.Component {


	static propTypes = {
    	data: PropTypes.object.isRequired,
    	location: PropTypes.object.isRequired
  	};


	constructor(props){
		super(props)
		this.state = {activeHeading:false}
		//this.banner = createRef()
		this.onScroll = this.onScroll.bind(this)
	}

	componentWillMount(){
        window.addEventListener('scroll', this.onScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.onScroll)
    }

  	onScroll = () =>{ 		
    	
    	const scrollTop = window.scrollY
    	
    	if(this.state.activeHeading){
    		if(scrollTop <= headerHeight){
    			//this.banner.setAttribute("class","banner banner-up")
    			this.setState({activeHeading:false})

    		}
    	} else if(scrollTop > headerHeight){
    		//this.banner.setAttribute("class","banner banner-down")
    		this.setState({activeHeading:true})
    	}
  	}

	render(){
		const {pathname} = this.props.location;
		const {edges} = this.props.data.allMarkdownRemark

		const headerClass = "white-header"
		
		//const bannerClasses = this.state.activeHeading ? "banner banner-down" : "banner banner-up"

		return (
			<MainWrapper onScroll={this.onScroll}>

                <Header className={headerClass}>
                    <HeaderContent className="main-content">
                      <h3>爱梦想</h3>
                      <Nav>

                      	<div className="mobile-nav">
                      		<button className="nav-btn">
                      			<div></div>
                      		</button>
                      		 <CSSTransition 
								in={this.state.openNavMenu} 
								classNames="nav-menu"
								timeout={300} unmountOnExit>
								<div className="nav-menu"></div>
							</CSSTransition>
                      	</div>

                      	<div className="navigations">
	                        {
	                          edges.map(({node})=>{
	                            const {path,nav} = node.frontmatter;
	                            const cn = path == pathname ? "nav-link active" : "nav-link"
	                            return (
	                                  <a 
	                                    key={path}
	                                    href={path}
	                                    className={cn}
	                                  >
	                                    {nav}
	                                  </a>
	                                );
	                          })
	                        }
                        </div>
                      </Nav>
                    </HeaderContent>
                </Header>

                <CSSTransition 
					in={this.state.activeHeading} 
					classNames="banner"
					timeout={300} unmountOnExit>

					<div class="banner">
						<div className="banner-logo">
							<img className="banner-logo-img" src={image200}/>
						</div>
						<div className="banner-section">
							<p className="banner-dclr">“200 Partners”深圳招募2019！</p>
							<a href="/200recruit" className="banner-btn">
								<p>进入活动</p>
							</a>
						</div>

					</div>

				</CSSTransition>

                {this.props.children}

            </MainWrapper>	
		)
	}
}

/*export const layoutQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___order]}) {
      edges {
        node {
          excerpt
          tableOfContents(pathToSlugField: "frontmatter.path", maxDepth: 2)
          headings {
            depth
            value
          }
          frontmatter {
            path
            title
            description
            order
            nav
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;*/
export default Layout;