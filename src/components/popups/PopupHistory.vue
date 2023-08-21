<template>
  <div
              class="modal fade modal-xl"
              id="historyBox"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      История
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <h5>Цикл 3</h5>
                      <h6>Программа N3</h6>
                      <p>8.05 - 10.40</p>
                      <ul>
                        <li><span>8:05 - </span>Набор воды</li>
                        <li><span>8:10 - </span>Замачивание</li>
                        <li><span>8:20 - </span>Стирка</li>
                        <li><span>9:00 - </span>Слив воды</li>
                        <li><span>9:10 - </span>Отжим</li>
                        <li><span>9:20 - </span>Набор воды</li>
                        <li><span>9:30 - </span>Ополаскивание</li>
                        <li><span>9:50 - </span>Слив воды</li>
                        <li><span>10:00 - </span>Отжим</li>
                        <li><span>10:20 - </span>Сушка белья</li>
                        <li><span>10:40 - </span>Завершение программы</li>
                      </ul>
                      <p>2ч 35мин</p>
                    </div>
                    <hr />
                    <div>
                      <h5>Цикл 2</h5>
                      <h6>Программа N3</h6>
                      <p>8.05 - 10.40</p>
                      <ul>
                        <li><span>8:05 - </span>Набор воды</li>
                        <li><span>8:10 - </span>Замачивание</li>
                        <li><span>8:20 - </span>Стирка</li>
                        <li><span>9:00 - </span>Слив воды</li>
                        <li><span>9:10 - </span>Отжим</li>
                        <li><span>9:20 - </span>Набор воды</li>
                        <li><span>9:30 - </span>Ополаскивание</li>
                        <li><span>9:50 - </span>Слив воды</li>
                        <li><span>10:00 - </span>Отжим</li>
                        <li><span>10:20 - </span>Сушка белья</li>
                        <li><span>10:40 - </span>Завершение программы</li>
                      </ul>
                      <p>2ч 35мин</p>
                    </div>
                    <hr />
                    <div>
                      <h5>Цикл 1</h5>
                      <h6>Программа N1</h6>
                      <p>8.05 - 10.40</p>
                      <ul>
                        <li><span>8:05 - </span>Набор воды</li>
                        <li><span>8:10 - </span>Замачивание</li>
                        <li><span>8:20 - </span>Стирка</li>
                        <li><span>9:00 - </span>Слив воды</li>
                        <li><span>9:10 - </span>Отжим</li>
                        <li><span>9:20 - </span>Набор воды</li>
                        <li><span>9:30 - </span>Ополаскивание</li>
                        <li><span>9:50 - </span>Слив воды</li>
                        <li><span>10:00 - </span>Отжим</li>
                        <li><span>10:20 - </span>Сушка белья</li>
                        <li><span>10:40 - </span>Завершение программы</li>
                      </ul>
                      <p>2ч 35мин</p>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
</template>

<script>


export default {
  name: "PopupHistory",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>
