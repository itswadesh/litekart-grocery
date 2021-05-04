<template>
  <div class="max-w-full">
    <div class="w-full min-h-screen">
      <Nav class="hidden md:flex" />
      <div class="container mx-2">
        <h1 class="my-4 text-3xl font-bold text-center text-secondary-500">
          Live Streams
        </h1>
        <div class="grid mb-8 lg:grid-cols-3 xl:grid-cols-5">
          <div
            :key="index"
            v-for="(remoteStream, index) in remoteStreams"
            class="px-2 py-2 bg-white rounded shadow"
          >
            <h3 class="mb-2 text-gray-600">{{ remoteStream.getId() }}</h3>
            <StreamPlayer
              class="w-full"
              :stream="remoteStream"
              :domId="remoteStream.getId()"
            ></StreamPlayer>
          </div>
        </div>
        <div class="" v-if="myLiveStreams && myLiveStreams.length > 0">
          <div class="mb-2 text-2xl font-bold text-primary-500">
            <div>Scheduled</div>
          </div>
          <div class="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
            <div
              v-for="item in myLiveStreams"
              class="px-4 py-2 bg-white rounded shadow"
              :key="item.title"
            >
              <div>
                <div v-text="item.title" class="text-gray-800"></div>
              </div>
              <div>
                <div class="text-xs text-gray-300">
                  {{ item.scheduleDateTime | date }}
                </div>
              </div>
              <div>
                <img v-lazy="item.imageUrl" alt="" />
              </div>
            </div>
          </div>
        </div>
        <button
          class="px-4 py-2 text-white bg-green-500 border"
          type="button"
          @click="joinEvent"
          :disabled="disableJoin"
        >
          join
        </button>
        <button
          class="px-4 py-2 text-white bg-red-500"
          @click="leaveEvent"
          :disabled="!disableJoin"
        >
          leave
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '~/components/Home/Nav'

import RTCClient from './agora-rtc-client'
import { log } from './config'
import StreamPlayer from '~/components/Video/stream-player'
import MY_LIVE_STREAMS from '~/gql/liveStream/myLiveStreams.gql'
import RTC_TOKEN from '~/gql/liveStream/rtcToken.gql'
import { mapMutations } from 'vuex'

export default {
  head() {
    return {
      title: 'Live Stream',
    }
  },
  asyncData({ env }) {
    const { AGORA_APP_ID, AGORA_LOG, AGORA_CHANNEL_NAME } = env
    return {
      AGORA_APP_ID,
      AGORA_LOG,
      AGORA_CHANNEL_NAME,
    }
  },
  components: {
    StreamPlayer,
    Nav,
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
      myLiveStreams: [],
    }
  },
  props: {
    msg: String,
  },

  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success', busy: 'busy' }),
    async joinEvent() {
      this.option.appid = this.AGORA_APP_ID
      const channel = (this.option.channel = this.AGORA_CHANNEL_NAME)
      try {
        this.busy(true)
        const rtcTokenObject = (
          await this.$apollo.query({
            query: RTC_TOKEN,
            variables: { isPublisher: true, channel },
            fetchPolicy: 'no-cache',
          })
        ).data.rtcToken
        this.option.token = rtcTokenObject.token
        this.option.uid = rtcTokenObject.uid
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
      // console.log('this option data is:', this.option)
      // if (this.option.role == 'host') {
      this.rtc
        .joinChannelAsHost(this.option)
        .then(() => {
          this.success('Join Success')
          this.rtc
            .publishStream()
            .then((stream) => {
              this.success('Publish Success')
              this.localStream = stream
            })
            .catch((err) => {
              // console.log('the error is', err)
              this.setErr('Publish Failure')
              log('publish local error', err)
            })
        })
        .catch((err) => {
          // console.log('the error is', err)
          log('join channel error', err)
        })
      // } else {
      //   this.rtc
      //     .joinChannelAsAudience(this.option)
      //     .then(() => {
      //       this.success('Join Success')
      //     })
      //     .catch((err) => {
      //       console.log('the error is', err)
      //       log('join channel error', err)
      //     })
      // }
      this.disableJoin = true
    },

    leaveEvent() {
      this.disableJoin = false
      this.rtc
        .leaveChannel()
        .then(() => {
          this.success('Leave Success')
        })
        .catch((err) => {
          // console.log('the error is', err)
          this.success('Leave Failure')
          log('leave error', err)
        })
      this.localStream = null
      this.remoteStreams = []
    },

    judge(detail) {
      this.setErr(`Please enter the ${detail}`)
    },

    async getData() {
      const myLiveStreams = (
        await this.$apollo.query({
          query: MY_LIVE_STREAMS,
          fetchPolicy: 'no-cache',
        })
      ).data.myLiveStreams
      // console.log('my schduled live stream is', myLiveStreams)
      this.myLiveStreams = myLiveStreams
    },
  },

  async created() {
    await this.getData()
    this.rtc = new RTCClient()
    let rtc = this.rtc

    rtc.on('stream-added', (evt) => {
      let { stream } = evt
      log('[agora] [stream-added] stream-added', stream.getId())
      rtc.client.subscribe(stream)
    })

    rtc.on('stream-subscribed', (evt) => {
      let { stream } = evt
      log('[agora] [stream-subscribed] stream-added', stream.getId())
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream)
      }
    })

    rtc.on('stream-removed', (evt) => {
      let { stream } = evt
      log('[agora] [stream-removed] stream-removed', stream.getId())
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== stream.getId()
      )
    })

    rtc.on('peer-online', (evt) => {
      this.success(`Peer ${evt.uid} is online`)
    })

    rtc.on('peer-leave', (evt) => {
      this.success(`Peer ${evt.uid} already leave`)
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== evt.uid
      )
    })
    // console.log('basic call first page loaded', rtc)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agora-box {
}
.agora-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
}
.agora-view {
  display: flex;
  flex-wrap: wrap;
}
.agora-video {
  width: 320px;
  height: 240px;
  margin: 20px;
}
.agora-input {
  margin: 20px;
  width: 320px;
}
.agora-text {
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
}
.agora-button {
  display: flex;
  width: 160px;
  justify-content: space-between;
  margin: 20px;
}
.agora-video {
  width: 320px;
  height: 240px;
}
</style>
