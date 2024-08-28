import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
              <Image source={require('../assets/images/logo_bedroom.png')} style={styles.logoSize} />
          </View>
          <TouchableOpacity style={styles.viewIdea} onPress={toggleModal}>
              <View style={styles.ideaContainer}>
                  <Text style={styles.ideaText}>วิธี</Text>
                  <Image source={require('../assets/images/creative-idea-icon.png')} style={styles.ideaSize} />
              </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.layoutContent}>
           <View style={{ paddingVertical: 50 }}>
             <Text style={styles.heading}>Welcome to Bedroom Magic</Text>
           </View>

           <View>
             <Text style={styles.paragraph}>
               ยินดีต้อนรับเข้าสู่ <Text style={styles.setItalic}>Bedroom Magic</Text> 
             </Text>
             <Text style={styles.paragraph}>คุณสามารถค้นหาสไตล์การตกแต่งห้องนอนของคุณได้แล้วที่นี่เราได้รวบรวมสไตล์ต่าง ๆ ที่น่าสนใจไว้ให้คุณแล้วมาค้นหาสไตล์ที่ชอบกัน</Text>
           </View>

           <View style={styles.distanceImage}>
               <Image source={require('../assets/bedroom/minimal/250.jpg')} style={styles.setImage} />
           </View>

           <View>
             <Text style={styles.paragraph}>เรามีฟังก์ชันที่น่าสนใจคือ คุณสามารถนำรูปภาพห้องนอนของคุณเข้ามาเพื่อค้นหาห้องในสไตล์ต่าง ๆ หรือจะให้ AI ช่วยออกแบบห้องนอนของคุณก็ได้ เพียงเลือกสไตล์ที่ต้องการ</Text>
           </View>

           <View style={{ marginVertical: 50}}>
               <View style={{ marginVertical: 15 }}>
                   <Text style={styles.fontHeadStyle}>รวม 5 สไตล์ห้องนอนที่น่าสนใจ</Text>
               </View>

               <View>
                   <Text style={[styles.paragraphStyle, styles.paragraphContent]}>1.สไตล์โมเดิร์น (Modern Style)</Text>
                   <Text style={styles.paragraphStyle}>สไตล์โมเดิร์นสมัยใหม่เน้นความสะดวกสบายและการใช้ชีวิตที่ทันสมัย ใช้วัสดุที่ทนทานและมีความทันสมัย เช่นเหล็ก และแก้ว
                   เน้นสีสันสดใสและสีเข้ม มีการใช้เฟอร์นิเจอร์และของตกแต่งที่มีเส้นผ่านศูนย์กลางและลักษณะเรียบง่าย การจัดเรียงและการตกแต่งมักเป็นระเบียบและมีความสมดุลแสงไฟที่ใช้มีความอ่อนโยนเพื่อเพิ่มความอบอุ่นและสร้างบรรยากาศที่สบายตา</Text>
               </View>
               <View style={styles.distanceImage}>
                 <Image source={require('../assets/bedroom/modern/419.jpg')} style={styles.setImage} />
               </View>

               <View>
                  <Text style={[styles.paragraphStyle, styles.paragraphContent]}>2.สไตล์มินิมอล (Minimal Style)</Text>
                   <Text style={styles.paragraphStyle}>สไตล์มินิมอลเน้นความง่าย สะอาด และเรียบง่าย ใช้สีพื้นฐาน เช่นขาว ดำ หรือเทา มีเฟอร์นิเจอร์และของตกแต่งที่มีลักษณะเรียบง่ายและไม่มีลวดลายเยอะ พื้นที่เปิดโล่ง เน้นแสงธรรมชาติ และลดของตกแต่งเข้ามาในพื้นที่ให้น้อยลงเพื่อเสริมความสงบสุขและความสะดวกสบายในการใช้ชีวิตประจำวัน</Text>
               </View>
               <View style={styles.distanceImage}>
                 <Image source={require('../assets/bedroom/minimal/62.jpg')} style={styles.setImage} />
               </View>

               <View>
                   <Text style={[styles.paragraphStyle, styles.paragraphContent]}>3.สไตล์วินเทจ (Vintage Style)</Text>
                   <Text style={styles.paragraphStyle}>สไตล์วินเทจเน้นความสง่างามและคลาสสิค มีเฟอร์นิเจอร์และของตกแต่งที่เรียบง่าย ใช้วัสดุเหล็ก กระจก และมีสีพื้นฐานเป็นหลัก เช่นขาว ดำ และเทา มีการใช้เส้นผมเป็นลวดลายบนเฟอร์นิเจอร์หรือฝาผนัง
                    เน้นการใช้แสงสว่างที่อ่อนโยนและเครื่องใช้ไฟฟ้าและเทคโนโลยีใหม่เพื่อความสะดวกสบายในชีวิตประจำวันด้วย</Text>
               </View>
               <View style={styles.distanceImage}>
                 <Image source={require('../assets/bedroom/vintage/1.jpg')} style={styles.setImage} />
               </View>

               <View>
                   <Text style={[styles.paragraphStyle, styles.paragraphContent]}>4.สไตล์สแกนดิเนเวียน (Scandinavian Style)</Text>
                   <Text style={styles.paragraphStyle}>สไตล์สแกนดิเนเวียนเน้นความเรียบง่ายและมีความสมดุลในการใช้วัสดุธรรมชาติ เช่นไม้และเหล็ก มีลักษณะการตกแต่งที่มีเส้นลายเรียบง่ายและเน้นความสวยงามในความเรียบง่าย เน้นการใช้สีเข้มเส้นเลือดหรือสีดำ
                   โดยมักมีการเสนอผลงานที่ออกแบบอย่างละเอียดและใช้การเรียงเป็นแนวตั้งหรือแนวนอนอย่างเรียบง่าย และมีการใช้แสงไฟที่มีความอ่อนโยนเพื่อเพิ่มความอบอุ่นและความรู้สึกของความสงบในพื้นที่</Text>
               </View>
               <View style={styles.distanceImage}>
                 <Image source={require('../assets/bedroom/scandinavian/329.jpg')} style={styles.setImage} />
               </View>

               <View>
                   <Text style={[styles.paragraphStyle, styles.paragraphContent]}>5.สไตล์คลาสสิก (Classic Style)</Text>
                   <Text style={styles.paragraphStyle}>สไตล์คลาสสิกเน้นความเรียบหรูและโดดเด่นใช้เฟอร์นิเจอร์และของตกแต่งที่มีลักษณะที่สง่างามและมีความสมดุล มักใช้วัสดุเช่นไม้หรือเหล็ก สีที่พบบ่อยคือสีทองและสีมุกการจัดเรียงและการตกแต่งมักเป็นระเบียบและเรียบง่าย
                   มีลวดลายที่สวยงามและเรียบหรูในการตกแต่ง โดยมักมีการใช้เครื่องใช้ไฟฟ้าและเทคโนโลยีใหม่ๆ ให้เข้ากับสไตล์โดยครบถ้วน</Text>
               </View>
               <View style={[styles.distanceImage, { marginBottom: 40 }]}>
                 <Image source={require('../assets/bedroom/classic/234.jpg')} style={styles.setImage} />
               </View>

           </View>
         </View>

      </ScrollView>

      {/* Modal with Swiper */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Swiper
                loop={false}
                // showsButtons={true}
                paginationStyle={styles.paginationStyle}
                activeDot={<View style={styles.activeDot} />}
                dot={<View style={styles.dot} />}
              >
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/1.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/2.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/3.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/4.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/5.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/6.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/7.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/8.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/9.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/10.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/11.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/12.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.slide}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/popup/13.png')} style={styles.modalImage} />
                  </TouchableWithoutFeedback>
                </View>
              </Swiper>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  layoutContent: {
    paddingHorizontal: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20
  },
  logoSize: {
    width: 70,
    height: 70
  },
  ideaSize: {
    width: 30,
    height: 30,
    zIndex: 2,
    marginTop: 5
  },
  viewIdea: {
    borderWidth: 2,
    borderColor: '#592804',
    borderRadius: 10,
    width: 50, 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  ideaContainer: {
    position: 'relative'
  },
  ideaText: {
    position: 'absolute',
    top: '-60%',
    left: 3,
    zIndex: 1,
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#592804',
  },
  heading: {
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 28
  },
  setItalic: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  setImage: {
    width: width * 0.75,
    height: height * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  distanceImage: {
    marginVertical: 30,
    alignItems: 'center',
  },
  fontHeadStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  paragraphStyle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left', 
    marginHorizontal: 10, 
    marginBottom: 10, 
  },
  paragraphContent: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  paginationStyle: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#592804',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Home;