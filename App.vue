<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	view,text {
		box-sizing: border-box;
	}
	.safe-area-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
		background: #fff;
	}
</style>
