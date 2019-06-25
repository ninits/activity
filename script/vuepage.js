Vue.component('page',{
    template:'\
    <div style="display: inline-block">\
            <template v-if="Math.ceil(eventlist_total/event_num)>(page_show+1)">\
              <template v-if="page_current<page_show">\
                <div v-for="n in page_show" @click="eventlist_page1(n,event_num)">{{ n }}</div>\
                <div>...</div>\
                <div @click="eventlist_page1(Math.ceil(eventlist_total/event_num),event_num)">{{ Math.ceil(eventlist_total/event_num) }}</div>\
              </template>\
              <template v-else-if="page_current>Math.ceil(eventlist_total/event_num)-page_show+1">\
                <div @click="eventlist_page1(1,event_num)">1</div>\
                <div>...</div>\
                <div v-for="n in Math.ceil(eventlist_total/event_num)" v-if="n>Math.ceil(eventlist_total/event_num)-page_show" @click="eventlist_page1(n,event_num)">{{ n }}</div>\
              </template>\
              <template v-else>\
                  <div @click="eventlist_page1(1,event_num)">1</div>\
                  <div>...</div>\
                  <div v-for="n in page_current+Math.floor(page_show/2)" v-if="n>=page_current-Math.floor(page_show/2)" @click="eventlist_page1(n,event_num)">{{ n }}</div>\
                  <div>...</div>\
                  <div @click="eventlist_page1(Math.ceil(eventlist_total/event_num),event_num)">{{ Math.ceil(eventlist_total/event_num) }}</div>\
                </template>\
            </template>\
            <div v-else v-for="n in  Math.ceil(eventlist_total/event_num)" @click="eventlist_page1(n,event_num)">{{ n }}</div>\
  </div>',
    props:['eventlist_total', 'page_show', 'event_num'],
    data:function(){
      return {
        page_current:1
      }
    },
    methods:{
      eventlist_page1:function(i,pagenum){
          this.page_current=i;
          this.$emit('eventlist_page2',i,pagenum)
      }
    }
  
  })