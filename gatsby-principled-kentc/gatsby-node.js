const path = require('path');

const grayMatter = require(`gray-matter`)

exports.onCreateNode = async function({
  node,
  actions,
  createNodeId,
  createContentDigest,
  loadNodeContent
},pluginOptions){

    console.log("onCreateNode", node.internal.mediaType)
  if(node.internal.mediaType == "text/markdown"){
    
    const {createNode,createParentChildLink} = actions

    var content = await loadNodeContent(node)
    var data = grayMatter(content,pluginOptions)

    console.log("my node ", data)

    var myMarkdown = {
      id:`${node.id} mymarkdown`,
      children:{},
      parent:node.id,
      internal:{
        content:data.content,
        contentDigest:createContentDigest(content),
        type:"FeiMarkdown",
        mediaType:node.mediaType
      },
      frontmatter:{
        something:"by fei",
        ...data.data
      }
    }

    

    createNode(myMarkdown)
    createParentChildLink({parent:node,child:myMarkdown})

    return myMarkdown

  } else return {}
}

exports.createPages = async ({actions, graphql}) => {
  const result = await graphql(`
  	{
  		allMarkdownRemark {
  			edges {
  				node{
  					frontmatter{
  						path
              template
  					}
  				}
  			}
  		}
  	}
  `);
  /*actions.createPage({
      path:"/",
      component:path.resolve("./src/templates/page/fei2.js"),
      context: {
        qq: `/`,
        link: `fei`
      },
    })

  actions.createPage({
      path:"fei",
      component:path.resolve("./src/templates/page/fei2.js"),
      context: {
        qq: `/`,
        link: `blog`
      }
    })*/

  result.data.allMarkdownRemark.edges.forEach(function(item,index){

    //${item.node.frontmatter.template}
    
  	actions.createPage({
  		path:item.node.frontmatter.path,      
  		component:path.resolve(`./src/templates/page/article.js`),
      context:{
        querySlug:item.node.frontmatter.path
      }
  	})
  })
};


