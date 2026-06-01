"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        class CommandCounter {
            m_count;
            constructor() {
                this.m_count = 0n;
            }
            get count() {
                return this.m_count;
            }
            set count(m_count) {
                this.m_count = m_count;
                return;
            }
            static instance(m_count) {
                const destination = new CommandCounter();
                destination.count = m_count;
                return destination;
            }
            increase() {
                ++this.m_count;
                return;
            }
            decrease() {
                --this.m_count;
                return;
            }
        }
        Script.CommandCounter = CommandCounter;
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
