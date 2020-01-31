import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import {VictoryLegend, VictoryPie } from 'victory-native';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';


const graphicColor = ['#388087', '#6fb3b8', '#badfe7','#f54275','#fbff05','#48e83c','#5dd9d1', '#f64275','#fbff0a','#41e83c','#5dd0d1']; // Colors

const defaultGraphicData = [{ y: 0 }, { y: 0 },{ y: 0 }, { y: 0 },{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 },{ y: 0 }, { y: 0 },  { y: 100 }]; // Data used to make the animate prop work

export const Chart = ({navigation}) => {

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  // Data that we want to display
  const wantedGraphicData = [ { y: navigation.state.params.nrMemories, label:navigation.state.params.nrMemories },
                              { y: navigation.state.params.nrHF, label: navigation.state.params.nrHF },
                              { y: navigation.state.params.nrMystery, label:navigation.state.params.nrMystery },
                              { y: navigation.state.params.nrYAF, label:navigation.state.params.nrYAF},
                              { y: navigation.state.params.nrCL, label:navigation.state.params.nrCL }, 
                              { y: navigation.state.params.nrReligion, label:navigation.state.params.nrReligion}, 
                              { y: navigation.state.params.nrFantasy, label:navigation.state.params.nrFantasy },
                              { y: navigation.state.params.nrCF, label:navigation.state.params.nrCF},
                              { y: navigation.state.params.nrThriller, label:navigation.state.params.nrThriller}, 
                              { y: navigation.state.params.nrPoems, label:navigation.state.params.nrPoems }, 
                              { y: navigation.state.params.nrScience, label:navigation.state.params.nrScience }
                            ]; 

  // Setting the data that we want to display                          
  useEffect(() => {
    setGraphicData(wantedGraphicData); 
  }, []);

  handleViewRef = ref => view = ref;
  
  bounce = () => view.bounce(800)
  .then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  return (
    <ScrollView>

      <Text></Text>

      <TouchableWithoutFeedback onPress={bounce}>
        <Animatable.View ref={handleViewRef}>
          <Text style={styles.titleText}>Books Chart</Text>
        </Animatable.View>
      </TouchableWithoutFeedback>

      <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={400}
        height={400}
        colorScale={graphicColor}
        innerRadius={50}
        title="Your books organized by categories"
      />

      <VictoryLegend 
        x={125} 
        y={10}
        title="Legend"
        centerTitle
        orientation="vertical"
        gutter={20}
        colorScale={graphicColor}
        style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
        data={[
          { name: "Memories"}, 
          { name: "Historical Fiction"}, 
          { name: "Mystery"},
          { name: "Young Adult Fiction"}, 
          { name: "Classical Literature"}, 
          { name: "Religion"},
          { name: "Fantasy"},
          { name: "Children fiction"}, 
          { name: "Thriller"}, 
          { name: "Poems"},
          {name:"Science"}
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'center'
  },
});

Chart.navigationOptions = () => ({
  headerTitle: 'Books types',
});
