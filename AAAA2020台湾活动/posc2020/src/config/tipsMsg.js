const msgArr = {
    1: {
        title: '海選規則',
        msg: "1.按照海選期間參賽者作品+K房+房間 （4%）金幣收禮魅力值計算人氣值榜單排名；<br/>2.若人氣值相同，則先到達該人氣值的排名在前面；<br/>3.海選結束後，排名前400名的選手可晉級下一賽段；<br/>4.本賽段榜單前5名可獲得本賽段特定獎勵；<br/>5.本賽段時間為2020年11月30日18:00至2020年12月02日23:59。",
        msg2: '作品=參賽選手在本賽段期間所有公開作品的金幣收禮魅力值<br/>K房=參賽選手在本賽段期間在任意K房上麥獲得的金幣收禮魅力值<br/>房間（4%）=本賽段期間參賽選手所擁有房間內（即參賽者為房主的房間）的所有人上麥獲得的金幣收禮魅力值*4%<br/><span>每個賽段結束後，榜單數據清零</span> '
    },
    2: {
        title: '1v1對戰規則',
        msg: "1.系統隨機匹配選手，一對一進行PK；<br/>2.2人本賽段人氣值總和較高的一組排在前面，若人氣值相同，則先到達該人氣值的一組排名在前面；<br/>3.以1v1對戰期間參賽者作品+K房+房間（4%）金幣收禮魅力值計算人氣值，每組最終人氣值較高的一方可以晉級下一輪比賽，本賽段晉級200人；<br/>4.若出現參賽者退賽情況，則其對手自動勝出，晉級下一輪比賽；<br/>5.若出現PK雙方平分情況，視為雙方均淘汰，均無法晉級下一輪比賽；<br/>6.本賽段榜單前5組中晉級的參賽者可獲得本賽段特定獎勵；<br/>7.本賽段時間為2020年12月03日00:05至2020年12月05日23:59。",
        msg2: '作品=參賽選手在本賽段期間所有公開作品的金幣收禮魅力值<br/>K房=參賽選手在本賽段期間在任意K房上麥獲得的金幣收禮魅力值<br/>房間（4%）=本賽段期間參賽選手所擁有房間內（即參賽者為房主的房間）的所有人上麥獲得的金幣收禮魅力值*4%<br/><span> 每個賽段結束後，榜單數據清零</span> '
    },
    3: {
        title: '團戰規則',
        msg: "1.依據上一輪比賽晉級的200名選手的人氣值排名，按比例隨機分配到4個戰隊；<br/> 2.戰隊排名：依據戰隊所有成員本賽段的人氣值總和排名，戰隊總人氣值高的戰隊排在前面；<br/>3.個人排名：每個戰隊內成員依據個人作品+K房+房間 （4%）金幣收禮魅力值計算人氣值排名，排名靠前的可晉級，若人氣值相同，則先到達該人氣值的排名在前面；<br/>4.本輪排名第1 的戰隊可晉級9人，第2的戰隊晉級8人，第3的戰隊晉級7人，第4的戰隊晉級6人，共晉級30人；<br/>5.本賽段4個戰隊內的 第1名可獲得本賽段特定獎勵；6.本賽段時間為2020年12月06日00:05至2020年12月08日23:59。",
        msg2: '作品=參賽選手在本賽段期間所有公開作品的金幣收禮魅力值<br/>K房=參賽選手在本賽段期間在任意K房上麥獲得的金幣收禮魅力值<br/>房間（4%）=本賽段期間參賽選手所擁有房間內（即參賽者為房主的房間）的所有人上麥獲得的金幣收禮魅力值*4%<br/><span> 每個賽段結束後，榜單數據清零</span> '
    },
    4: {
        title: '出道決戰規則',
        msg: "1.本賽段30名選手將在12月11日晚20:00在指定官方K房直播比賽；<br/>2.根據參賽選手作品+K房（包括決賽K房）的金幣收禮魅力值計算出道值，本賽段榜單排名，越靠前的擁有優先選擇麥序的權利，以選手本賽段12月10日0:00前的出道值排名為準，K房直播開始前將由官方人員聯繫選手確定比賽具體流程等事宜；<br/>3.決賽K房內12月11日20：00至23:00期間上麥收禮可獲得10%的魅力值加成；<br/>4.總成績以選手本賽段出道值（包括決賽K房）計算，排名前11位的選手獲得出道機會和相應的獎勵；<br/>5.本賽段時間為2020年12月09日00:05至2020年12月11日23:00。",
        msg2: '作品=參賽選手在本賽段期間的所有公開作品的金幣收禮魅力值<br/>普通K房=參賽選手在本賽段期間在除決賽K房的任意K房上麥獲得的金幣收禮魅力值<br/>決賽K房=參賽選手12月11日19點至24點在官方指定K房上麥獲得的金幣收禮魅力值（包括10% 加成） '
    }
}
export default msgArr