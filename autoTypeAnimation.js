new TypeIt("#element", { 
  strings: ["TensorFlow"],
  lifeLike: true,
  waitUntilVisible: true,
})
  .pause(300)
  .delete(10, { deleteSpeed:12 })
  .type("Data Science", { lifeLike: true })
  .pause(300)
  .delete(12, { deleteSpeed: 12 })
  .type("Machine Learning", { lifeLike: true })
  .pause(300)
  .delete(16, { deleteSpeed: 98 })
  .type("Keras", { lifeLike: true })
  .pause(300)
  .delete(5, { deleteSpeed: 10 })
  .type("Text generation", { lifeLike: true })
  .pause(300)
  .delete(15, { deleteSpeed: 47 })
  .type("TensorFlow Hub", { lifeLike: true })
  .pause(300)
  .delete(14, { deleteSpeed: 27 })
  .type("JAX", { lifeLike: true })
  .pause(300)
  .delete(3, { deleteSpeed: 38 })
  .type("ML Study JAM", { lifeLike: true })
  .pause(300)
  .delete(12, { deleteSpeed: 48 })
  .type("Object detection", { lifeLike: true })
  .pause(300)
  .delete(16, { deleteSpeed: 44 })
  .type("Kaggle", { lifeLike: true })
  .pause(300)
  .delete(6, { deleteSpeed: 58 })
  .type("Colab", { lifeLike: true })
  .pause(300)
  .delete(5, { deleteSpeed: 55 })
  .type("Hugging Face", { lifeLike: true })
  .pause(300)
  .delete(12, { deleteSpeed: 61 })
  .type("OpenAI", { lifeLike: true })
  .pause(300)
  .delete(6, { deleteSpeed: 59 })
  .type("TensorFlow", { lifeLike: true })
  .go();