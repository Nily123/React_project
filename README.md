# React + Vite
!!聲明，此專案為個人能力展示用途，無商業或營利目的!!

你好，這是我的react專案，其設計目的設定在類似於桌面小程式功能的網頁，有天氣預報、新聞、股票查詢、聽音樂、行事曆，以及運勢小占卜。

首先，在主頁的部分，除了顯示日期時間之外，背景的影片會隨著時間變換，但因為github的容量限制
背景影片請到下方網址進行下載 (https://drive.google.com/drive/folders/194k8GY9-TlIaQGPMcHj0YqR46qF_rTsS?usp=sharing)
下載後放到pulic下，或是在BackgroundVideo.jsx中改變路徑
![image](https://github.com/user-attachments/assets/7a0e1bd7-d71a-42bd-a3c5-9b5b3167f86e)

天氣:以縣市劃分用api的方式將資料進行處理並顯示
![image](https://github.com/user-attachments/assets/d0ddd5d3-bc78-4358-b82c-6ddb5f51e00a)

新聞:這邊是用google的news api進行串接到內部的express做處理再從伺服器進行資料串接
![image](https://github.com/user-attachments/assets/589005de-e1ac-4b69-bb5f-ffa3db76c7cd)

股票:用yfinance的api進行搜尋，但其不支持網頁端的api訪問，所以也是透過express的伺服器進行訪問，再讓網頁從express獲取資訊
![image](https://github.com/user-attachments/assets/e23f5979-633a-4ea7-b9a8-9b6965179c97)

音樂:右上方可以從本地端匯入自己的音樂檔，背景的音浪是透過組件中的api將音樂的資訊進行生成的，所以在停止播放後會不會生成
![image](https://github.com/user-attachments/assets/aa1f8983-eb26-42e8-bd50-191624c246b7)

行事曆:透過express建立的伺服器將資料從本地的json檔中讀取以及寫入，模擬資料庫的樣式，使專案重啟後之前的紀錄依舊可以保存不會消失。右邊的代辦事項由左邊的行事曆點選日期後顯示該日的行程。
![image](https://github.com/user-attachments/assets/ccb8508d-dc6e-4984-8505-2f14254ea00a)

占卜:由css的3D特效組成的小占卜，可以玩玩看當日運勢如何，功能以及內容上未來還會再做更進一步的設計
![image](https://github.com/user-attachments/assets/4a359cb4-d4a0-4b69-af87-c77907144bc6)

以上就是我的專案，如果有想詢問的也可以聯繫我
jemmy.chao1@gmail.com
