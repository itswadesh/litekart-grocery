<template>
  <div>
    <div>
      <div class="mx-auto text-center">
        <div dark>
          <h3 class="text-3xl font-bold">Current Live vendors</h3>
        </div>

        <div v-if="!liveChannels">No live vendor Now</div>
        <div v-else>
          <div v-for="item in liveChannels" :key="item.title">
            <div>{{ item.user.firstName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RTCClient from './agora-rtc-client'
import { log } from './config'
import StreamPlayer from '~/components/Video/stream-player'
import MY_LIVE_STREAMS from '~/gql/liveStream/myLiveStreams.gql'
import RTC_TOKEN from '~/gql/liveStream/rtcToken.gql'
import CHANNEL_LIST from '~/gql/liveStream/channelList.gql'
import { mapMutations } from 'vuex'

export default {
  components: {
    StreamPlayer,
  },
  head() {     
    return {       
      title: 'Live Stream',     
      }   
  },
  data() {
    return {
      option: {
        appid: '',
        token: '',
        uid: 0,
        channel: 'litekart',
        role: 'host',
      },
      disableJoin: false,
      localStream: null,
      remoteStreams: [],
      userType: [
        { text: 'Host', value: 'host' },
        { text: 'Audience', value: 'audience' },
      ],
      liveChannels: null,
    }
  },
  async created() {
    await this.liveVendors()
  },
  methods: {
    async liveVendors() {
      const liveChannels = (
        await this.$apollo.query({
          query: CHANNEL_LIST,
          fetchPolicy: 'no-cache',
        })
      ).data.channelList
      this.liveChannels = liveChannels
    },
  },
}
</script>

<style></style>
