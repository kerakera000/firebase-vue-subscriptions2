<template>
    <div class="row">
        <div class="col">
            <h2>サブスクプラン</h2>

            <hr />

            <div v-for="(product, index) in products" :key="index + '-product'">
                <h3>{{ product.name }}</h3>

                <div v-for="(price, priceIndex) in product.prices" :key="priceIndex + '-price'">
                    <div class="form-check">
                        <input type="radio" class="form-check-input" v-model="selectedPrice" :value="price.id" :id="'price-' + price.id">

                        <label :for="'price-' + price.id" class="form-check-label">
                            {{ price.unit_amount }} {{ price.interval }}
                        </label>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" @click="createSub" :disabled="!selectedPrice || isLoading">
                {{ isLoading ? "Loading..." : "Create subscription" }}
            </button>
        </div>
    </div>
</template>


<script>
import {
    getFirestore,
    getDocs,
    where,
    query,
    collection,
    addDoc,
    onSnapshot,
} from "firebase/firestore";
import { firebaseAuth } from '@/firebase';

export default {
    data(){
        return{
            products: [],
            selectedPrice:null,
            isLoading:false,
        }
    },
    mounted(){
        this.fechProducts();
    },
    methods: {
        async fechProducts(){
            const db = getFirestore();

            const productRef = collection(db,"products");
            const productsQuery = query(productRef, where("active","==", true));
            const productQuerySnap = await getDocs(productsQuery);

            productQuerySnap.forEach(async (doc) =>{
                const priceRef = collection(db, "products", doc.id, "prices");
                const priceQuerySnap = await getDocs(priceRef);

                this.products.push({
                    id:doc.id,
                    ...doc.data(),
                    prices: priceQuerySnap.docs.map((price) => {
                        return{
                            id: price.id,
                            ...price.data(),
                        }
                    })
                })
            })
        },
        async createSub() {
            this.isLoading = true;
            const db = getFirestore();
            const collectionRef = collection(
                db,
                "customers",
                firebaseAuth.currentUser.uid,
                "checkout_sessions"
            );

            try {
                const docRef = await addDoc(collectionRef, {
                    price: this.selectedPrice,
                    success_url: window.location.origin,
                    cancel_url: window.location.origin,
                });

                onSnapshot(docRef, (snap) => {
                    const { error, url } = snap.data();

                    if (error) {
                        console.error(`An error occurred: ${error.message}`);
                        this.isLoading = false;
                    }

                    if (url) {
                        window.location.assign(url);
                    }
                });
            } catch (error) {
                console.error(`An error occurred while creating subscription: ${error.message}`);
                this.isLoading = false;
            }
        }
    }
}
</script>