(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-563449aa"],{"19b4":function(t,e,n){},5646:function(t,e,n){},9201:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"productList"},[n("SearchFrom"),n("a-button",{staticClass:"addBtn"},[n("router-link",{attrs:{to:{name:"ProductAdd"}},nativeOn:{click:function(e){return t.addProduct(e)}}},[t._v("添加商品")])],1),n("PruductTbale")],1)},r=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search-box"},[n("a-form-model",{attrs:{layout:"inline"},on:{submit:t.handleSubmit},nativeOn:{submit:function(t){t.preventDefault()}}},[n("a-form-model-item",{attrs:{label:"检索关键字"}},[n("a-input",{attrs:{placeholder:"请输入关键字"},model:{value:t.$store.state.searchForm.searchWord,callback:function(e){t.$set(t.$store.state.searchForm,"searchWord",e)},expression:"$store.state.searchForm.searchWord"}})],1),n("a-form-model-item",{attrs:{label:"商品类目"}},[n("a-select",{staticStyle:{width:"200px"},attrs:{"show-search":"",placeholder:"请选择商品类目",allowClear:""},on:{change:t.handleChange}},t._l(t.$store.state.categoryList,(function(e){return n("a-select-option",{key:e.id,attrs:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])})),1)],1),n("a-form-model-item",[n("a-button",{attrs:{type:"primary","html-type":"submit"}},[t._v("搜索")])],1)],1)],1)},o=[],i=n("1da1"),c=(n("96cf"),{data:function(){return{}},beforeCreate:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$store.dispatch("setCategoryList");case 1:case"end":return e.stop()}}),e)})))()},methods:{handleSubmit:function(){this.$store.dispatch("setProductList",{page:1})},handleChange:function(t){this.$store.commit("setCategory",t)},searchWordInput:function(t){this.$store.commit("setSearchWord",t.target.value)}}}),u=c,d=(n("fd93"),n("2877")),l=Object(d["a"])(u,s,o,!1,null,null,null),h=l.exports,m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a-table",{attrs:{columns:t.columns,"data-source":t.$store.state.productList,pagination:t.$store.state.pagination},on:{change:t.turnPage},scopedSlots:t._u([{key:"operation",fn:function(e,a){return n("div",{staticClass:"editable-row-operations"},[n("a-button",{on:{click:function(n){return t.edit(e,a)}}},[t._v("编辑")]),n("a-button",{on:{click:function(n){return t.deleteProduct(e,a)}}},[t._v("删除")])],1)}}])})},p=[],f=[{title:"ID",dataIndex:"id",key:"id"},{title:"标题",dataIndex:"title",key:"title",ellipsis:!0,width:300},{title:"描述",dataIndex:"desc",key:"desc",ellipsis:!0},{title:"类目",dataIndex:"categoryName.name",key:"category",ellipsis:!0},{title:"预售价格",dataIndex:"price",key:"price"},{title:"折扣价格",dataIndex:"price_off",key:"price_off"},{title:"标签",dataIndex:"tags",key:"tags"},{title:"限制购买数量",dataIndex:"inventory",key:"inventory"},{title:"上加状态",dataIndex:"status",key:"status",customRender:function(t,e){return 0===e.status?"下架":"上架"}},{title:"操作",dataIndex:"operation",key:"operation",width:200,scopedSlots:{customRender:"operation"}}],y={data:function(){return{data:[],columns:f,editingKey:""}},beforeCreate:function(){this.$store.dispatch("setProductList")},methods:{turnPage:function(t){this.$store.dispatch("setProductList",{page:t.current})},edit:function(t,e){this.$router.push({name:"ProductAdd",query:{id:e.id}})},deleteProduct:function(t,e){var n=this,a=this.$createElement;this.$confirm({title:"警告！",content:a("div",{style:"color:red;"},["确定删除商品 ".concat(e.title," ")]),onOk:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$api.deleteProduction(e.id);case 2:a=t.sent,r="success"===a.status?"success":"error",n.$message[r](a.msg),n.$store.dispatch("setProductList");case 6:case"end":return t.stop()}}),t)})));function a(){return t.apply(this,arguments)}return a}(),okText:"确定",cancelText:"取消",class:"deleteBtn"})}}},b=y,v=Object(d["a"])(b,m,p,!1,null,"c831d360",null),g=v.exports,k={components:{SearchFrom:h,PruductTbale:g},methods:{addProduct:function(){this.$store.commit("changeSelectedKeys",["ProductAdd"])}}},$=k,x=(n("99a5"),Object(d["a"])($,a,r,!1,null,"5a822270",null));e["default"]=x.exports},"99a5":function(t,e,n){"use strict";n("19b4")},fd93:function(t,e,n){"use strict";n("5646")}}]);
//# sourceMappingURL=chunk-563449aa.855fdf37.js.map