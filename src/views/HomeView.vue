<template>
  <default-layout>
    Homepage

    <div class="btnhome">
      <button>
        <a href="https://buy.stripe.com/test_eVa2bP8Zi2Ml5cA6op">
          自分で選択
        </a>
      </button>

      <stripe-buy-button
        buy-button-id="buy_btn_1OmCEpFeDgOTPcWBeSy5T3bb"
        publishable-key="pk_test_51Ok4wLFeDgOTPcWB1xnmq5fTVHbeEH3sciJWm0mlNuHetUg0n3SnLzZFcldzMbj8dQXITJURzIw4Nr6tYKWpZAnd00iEkFBF5T"
      >
      </stripe-buy-button>

      <stripe-buy-button
        buy-button-id="buy_btn_1OmCTtFeDgOTPcWBefuQ0lgI"
        publishable-key="pk_test_51Ok4wLFeDgOTPcWB1xnmq5fTVHbeEH3sciJWm0mlNuHetUg0n3SnLzZFcldzMbj8dQXITJURzIw4Nr6tYKWpZAnd00iEkFBF5T"
      >
      </stripe-buy-button>

      <stripe-buy-button
        buy-button-id="buy_btn_1OmCVMFeDgOTPcWBIx4S8tGw"
        publishable-key="pk_test_51Ok4wLFeDgOTPcWB1xnmq5fTVHbeEH3sciJWm0mlNuHetUg0n3SnLzZFcldzMbj8dQXITJURzIw4Nr6tYKWpZAnd00iEkFBF5T"
      >
      </stripe-buy-button>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import { db } from "@/firebase" // Firestoreのインスタンスをインポート

export default {
  components: { DefaultLayout },
  methods: {
    async handlePaymentSuccess(amount) {
      // 支払いが成功した場合の処理
      try {
        const uid = 'G4xkaRBB9eaO3UYja7K90sKpK5J2'; // ユーザーのUIDを取得する方法に応じて変更する必要があります
        const pointRef = db.collection('customers').doc(uid).collection('point');

        // Firestoreに購入した額を追加
        await pointRef.add({
          amount: amount,
          timestamp: new Date()
        });

        console.log("購入が完了しました。Firestoreにデータを追加しました。");
      } catch (error) {
        console.error("Firestoreへのデータの書き込み中にエラーが発生しました:", error);
      }
    }
  }
}
</script>


<style>

.btnhome{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}
</style>