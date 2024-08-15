<script setup>
import formatDate from '@/assets/utils/formatDate'
import formattedPrice from '@/assets/utils/formatPrice'
import { RouterLink } from 'vue-router'

const props = defineProps({
  offerInfos: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <RouterLink class="offerCard" :to="{ name: 'offer', params: { id: id } }">
    <div class="firstPart">
      <div class="owner">
        <img :src="offerInfos.owner.data.attributes.avatar.data?.attributes.url" alt="" />
        <p>{{ offerInfos.owner.data.attributes.username }}</p>
      </div>

      <img
        class="productImg"
        :src="offerInfos.pictures.data[0].attributes.url"
        :alt="offerInfos.title"
        alt=""
      />
      <p>{{ offerInfos.title }}</p>
      <p>{{ formattedPrice(offerInfos.price) }} €</p>
    </div>

    <div class="secondPart">
      <p class="date">{{ formatDate(offerInfos.createdAt) }}</p>
      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </RouterLink>
</template>

<style scoped>
.offerCard {
  height: 380px;
  width: calc((100% - 60px) / 5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* FIRSTPART */

.firstPart p {
  font-weight: bold;
  line-height: 20px;
}

.firstPart p:last-child {
  margin-top: 5px;
}

/* Owner */

.owner {
  display: flex;
  align-items: center;
  gap: 5px;
}

.owner img {
  border-radius: 50%;
  width: 25px;
}

.owner p {
  font-size: 14px;
}

/* Product img */

.productImg {
  height: 240px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin: 7px 0 5px;
}

/* SECONDPART */

.secondPart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.secondPart svg {
  font-size: 20px;
  color: var(--grey);
}

.date {
  font-size: 12px;
  color: var(--grey);
  margin-top: 20px;
}

/* MEDIA */

@media (max-width: 1050px) {
  .offerCard {
    height: 400px;
    width: calc((100% - 45px) / 4);
  }
  .productImg {
    height: 300px;
  }
}

@media (max-width: 900px) {
  .offerCard {
    height: 450px;
    width: calc((100% - 30px) / 3);
  }
  .productImg {
    height: 350px;
  }
}

@media (max-width: 750px) {
  .offerCard {
    height: 450px;
    width: calc((100% - 15px) / 2);
  }
  .productImg {
    height: 320px;
  }
}
</style>
