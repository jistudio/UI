 (function(global, $) {
        "use strict";

        // $(document).ready(function() {
        //     // 5. 인스턴스 만들기
        //     var tab1 = new TabMenu('.tab_menu1');
        //     var tab2 = new TabMenu('.tab_menu2');    

        // });

        // 1. 객체 만들기
        // 2. 변수 => 프로퍼티로 만들기 (this)
        function TabMenu(selector) {
            this.$tab_menu = $(selector);
            this.$tab_links = this.$tab_menu.find('a');
            this.$tabs = this.$tab_menu.next().find('.tab');
            this.class_name = 'change_icon';
            this.is_open = false;
            this.anim_speed = 300;

            // 6. 생성자 내부에서 호출하기
            this.init();
        }
        // 3. 함수 => 매서드 만들기
        // 4. 객체 내부에서 프로퍼티와 매서드 사용하기 (this)
        TabMenu.prototype.init = function() {
            // 객체 this를 that에 참조
            var that = this;
            var $tab_links = that.$tab_links;
            $.each($tab_links, function(idx) {
                // $.each callback func 안에서 this는 객체가 아님, this를 사용 못함 
                that.$tab_link = $tab_links.eq(idx);
                that.$tab_link.on('click', $.proxy(that.settingTabmenu, that, that.$tab_link));
            });
        }
        TabMenu.prototype.settingTabmenu = function($tab_link) {

            this.changeTabIcon($tab_link);
            this.toggleTabMenu($tab_link);

        }
        TabMenu.prototype.changeTabIcon = function($tab_link) {

            if ($tab_link.hasClass(this.class_name)) {
                $tab_link.removeClass(this.class_name);
            } else {
                this.$tab_links.filter('.' + this.class_name).removeClass(this.class_name);
                $tab_link.addClass(this.class_name);
            }
        }
        TabMenu.prototype.toggleTabMenu = function($tab_link) {

            this.$selectedContent = $($tab_link.attr('href'));

            // tab 열린상태
            if (this.is_open) {
                this.$selectedContent.hasClass('active') ?
                    this.closeTab() :
                    this.openTab(this.$selectedContent, true);
            }
            // tab 이 닫힌 상태
            else {
                this.openTab(this.$selectedContent);
            }
        }
        TabMenu.prototype.openTab = function($content, is_opened) {
            if (!is_opened) {
                this.is_open = true;
                this.$tab_menu.animate({
                    'height': '50%'
                }, this.anim_speed);
            }
            // 초기화
            this.$tabs.hide().removeClass('active');
            $content.show().addClass('active');
        }
        TabMenu.prototype.closeTab = function() {
            this.is_open = false;
            this.$tab_menu.animate({
                'height': '100%'
            }, this.anim_speed);
        }
        // 객체 외부 공개
        global.TabMenu = TabMenu;

    })(this, this.jQuery);