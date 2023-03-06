<template>
  <div class="row">
    <article class="col-sm-4" v-for="item in personagem" :key="item.id">
      <div class="card">
        <img :src="item.image" />
        <div>
          <div>
            <h2>{{ item.name }}</h2>
          </div>
          <div>
            <span class="status-dot" :class="{ 'green-dot': item.status === 'Alive', 'red-dot': item.status === 'Dead', 'gray-dot': item.status === 'unknown', }"></span>
          </div>
          <div>
            <span class="span-div">Status - {{item.status }}</span>
          </div>
          <div>
            <span>Especie - {{ item.species }}</span>
          </div>
          <div>
            <span>Sexo - {{ item.gender }}</span>
          </div>
          <div>
            <span>Origem - {{ item.origin.name }}</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import api from "./services/api";

export default {
  data() {
    return {
      personagem: [],
    };
  },
  async created() {
    const response = await api.get("https://rickandmortyapi.com/api/character");
    const pages = response.data.info.pages;
    console.log(response.data);
    const results = [];

    for (let i = 1; i <= pages; i++) {
      const pageResponse = await api.get(
        `https://rickandmortyapi.com/api/character?page=${i}`
      );
      results.push(...pageResponse.data.results);
    }

    this.personagem = results;
  },
};
</script>


<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-sm-4 {
  width: calc((100% - 30px) / 3);
  margin-bottom: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  box-shadow: 5px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  margin: 1rem;
  padding: 1rem;
}

.card p {
  display: block;
  margin: 5px 0;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}
.card h2 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
}
.card h2:hover {
  cursor: pointer;
  color: orange;
}

.card img {
  border-radius: 50%;
  width: 100%;
  max-width: 10rem;
  height: auto;
  margin: 20px;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  align-items: center;
}
.green-dot {
  background-color: green;
}

.red-dot {
  background-color: red;
}

.gray-dot {
  background-color: gray;
}
</style>
