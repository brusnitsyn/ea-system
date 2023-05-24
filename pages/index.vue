<script lang="ts" setup>
const device = useDevice()
const imageSize = computed(() => {
  return device.isMobile ? '38' : '64'
})
const iconSize = computed(() => {
  return device.isMobile ? '32' : '48'
})
</script>

<template>
  <PageWrapper>
    <PageBody class="flex flex-col gap-y-10 lg:gap-y-24">
      <PageSection class="h-screen flex flex-col items-center justify-center -mt-[60px]">
        <PageTitle class="text-center"
          >Система учёта оборудования<br />ВУЗа</PageTitle
        >
        <PageSubtitle class="text-center text-gray-400"
          >Система позволяет отслеживать состояние оборудования,<br />своевременно
          находить и устранять проблемы.</PageSubtitle
        >
      </PageSection>
      <PageSection>
        <PageSectionTitle class="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">
          Как работает система?
        </PageSectionTitle>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card icon="uil:sign-out-alt" :icon-size="iconSize" class="bg-neutral-100 p-4">
            <template #title>
              Авторизация
            </template>
            <template #text>
              Для просмотра данных необходимо авторизироваться под выданным логином и паролем
            </template>
          </Card>
          <Card icon="uil:exclamation-octagon" :icon-size="iconSize" class="bg-neutral-100 p-4">
            <template #title>
              Сообщите о проблеме
            </template>
            <template #text>
              Найдя необходимое оборудование, вы можете нажать на кнопку диагностики и в комментарии описать свою проблему
            </template>
          </Card>
          <Card icon="uil:check" :icon-size="iconSize" class="bg-neutral-100 p-4">
            <template #title>
              Решение проблемы
            </template>
            <template #text>
              Специалист по работе с оборудованием отреагирует на вашу проблему и решит её в короткие сроки
            </template>
          </Card>
        </div>
      </PageSection>
      <PageSection class="bg-neutral-100 rounded-lg pt-8 md:pt-16 pb-6 md:pb-16 px-8 md:px-14">
        <PageSectionTitle class="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">
          Оборудование
        </PageSectionTitle>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 md:gap-y-10">
          <Card class="flex flex-col items-center text-center" icon="fluent:desktop-32-regular" :icon-size="iconSize">
            <template #title>
              Компьютеры
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" icon="fluent:print-48-regular" :icon-size="iconSize">
            <template #title class="!text-base">
              Принтеры
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" icon="fluent:network-adapter-16-regular" :icon-size="iconSize">
            <template #title>
              Сетевое оборудование
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" icon="fluent:projection-screen-text-24-regular" :icon-size="iconSize">
            <template #title>
              Проекторы
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" icon="fluent:desktop-speaker-20-regular" :icon-size="iconSize">
            <template #title>
              Мультимедиа
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" icon="fluent:keyboard-mouse-16-regular" :icon-size="iconSize">
            <template #title>
              Периферия
            </template>
          </Card>
        </div>
      </PageSection>
      <PageSection class="mb-4">
        <PageSectionTitle class="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">
          Почему сайт полезен?
        </PageSectionTitle>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 md:gap-y-10">
          <Card class="flex flex-col items-center text-center" image="/img/check.png" :image-size="imageSize">
            <template #title>
              Контроль состояния комплектующих в онлайн режиме
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" image="/img/diag.png" :image-size="imageSize">
            <template #title>
              Запрос диагностики не выходя из кабинета
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" image="/img/repair.png" :image-size="imageSize">
            <template #title>
              Замена, настройка и устранение неисправностей
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" image="/img/comments.png" :image-size="imageSize">
            <template #title>
              Описание проблемы в комментарии
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" image="/img/update.png" :image-size="imageSize">
            <template #title>
              Возможность обновления данных
            </template>
          </Card>
          <Card class="flex flex-col items-center text-center" image="/img/actual.png" :image-size="imageSize">
            <template #title>
              Актуальность информации
            </template>
          </Card>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style scoped></style>
