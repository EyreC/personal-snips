'use babel';

import EyreCSnippetsView from './eyre-c-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  eyreCSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.eyreCSnippetsView = new EyreCSnippetsView(state.eyreCSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.eyreCSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eyre-c-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.eyreCSnippetsView.destroy();
  },

  serialize() {
    return {
      eyreCSnippetsViewState: this.eyreCSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('EyreCSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
