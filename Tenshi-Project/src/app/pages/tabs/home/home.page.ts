import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Switch } from 'src/app/interfaces/switch';
import { Inner } from 'src/app/interfaces/inner';
import { map } from 'rxjs/operators';
import { Node } from 'src/app/interfaces/node';
import { Port } from 'src/app/interfaces/port';
import { PortService } from 'src/app/services/port.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private houseId: string = "";

  //Collections
  private switchCollection: AngularFirestoreCollection<Switch>;
  private nodeCollection: AngularFirestoreCollection<Node>;
  private portCollection: AngularFirestoreCollection<Port>;

  //Subscriptions
  private switchSubscription: Subscription;
  private nodeSubscription: Subscription;
  private portSubscription: Subscription;

  //Arrays - Data
  public innerData: Inner[] = [];
  public switchs = new Array<Switch>();
  public nodes: Node[] = [];
  private port: Port[] = [];

  constructor(private afs: AngularFirestore, private dataService: DataService, private portService: PortService) {
    this.houseId = dataService.getHouseId();
  }

  getSwitch() {
    return this.switchCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getNode(nodeId: string) {
    return this.nodeCollection.doc<Node>(nodeId).valueChanges().pipe(map(actions => {
      const data = actions;
      const id = nodeId;
      return { id, ...data };
    }));
  }

  getPort() {
    return this.portCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  ngOnInit() {
    //console.log(this.houseId);
    this.switchCollection = this.afs.collection<Switch>('homes/' + this.houseId + '/Configs');
    this.nodeCollection = this.afs.collection<Node>('nodes');


    this.switchSubscription = this.getSwitch().subscribe(data => {
      this.switchs = data;
      //console.log("Switch:");
      //console.log(this.switchs);

      try {
        this.nodeSubscription.unsubscribe();
      } catch (error) {
      }

      const diferentsNodes: string[] = [];
      this.switchs.forEach(e => {
        if (!diferentsNodes.includes(e.nodeId)) {
          diferentsNodes.push(e.nodeId);
        }
      });

      //console.log(diferentsNodes);

      diferentsNodes.forEach(element => {
        //console.log("Creating a Node Subscription with Id:" + element);

        this.nodeSubscription = this.getNode(element).subscribe(data => {
          const id = element;

          this.portCollection = this.afs.collection<Port>('nodes/' + id + '/ports');

          this.portSubscription = this.getPort().subscribe(dataa => {
            data.port = dataa;
            //console.log("Node Inside Port");
            //console.log(this.nodes);
            this.innerJoin();
          });

          if (this.nodes.findIndex(a => a.id === id) != -1 ? true : false) {
            this.nodes.splice(this.nodes.findIndex(a => a.id == id), this.nodes.findIndex(a => a.id === id) != -1 ? 1 : 0, data);
            this.innerJoin();
          }
          else {
            this.nodes.push(data);
          }
          //console.log("Node");
          //console.log(this.nodes);
        });
      });
      this.innerJoin();
    });
  }

  innerJoin() {
    this.innerData = new Array<Inner>();
    this.switchs.forEach(element => {
      let data = {
        switchId: element.id,
        nodeId: element.nodeId,
        name: element.name,
        port: element.port
      };
      this.innerData.push(data);
    });
    if (this.nodes.length > 0) {
      this.nodes.forEach(element => {
        //let indexInner = this.innerData.findIndex(a => a.nodeId === element.id);
        let indexInner = this.innerData.filter(x => x.nodeId === element.id).map(x => this.innerData.indexOf(x));

        //console.log("Index's:")
        //console.log(indexInner);

        indexInner.forEach(index => {
          try {
            this.innerData[index].stats = element.port.filter(y => y.id === this.innerData[index].port)[0].stats;
            this.innerData[index].ready = true;
            //console.log("Inner inside Index");
            //console.log(this.innerData);
          } catch (error) {
          }
        });
      });
    }
    //console.log("Inner:")
    //log(this.innerData);
  }

  async changePort(nodeId: string, port: string, stats: string) {
    try {
      await this.portService.updateStats(nodeId, port, stats);
    } catch (error) {
      //console.log(error);
    }
  }
}
